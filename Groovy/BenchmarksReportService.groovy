package com.fhs.reports

import com.fhs.command.CompSetReportSection
import com.fhs.competitive.CompSet
import com.fhs.evaluation.Evaluation
import com.fhs.internal.AssetGroup
import com.fhs.internal.BenchmarkControl
import com.fhs.internal.Section
import com.fhs.security.RoleAuthorities
import com.fhs.user.User
import grails.plugin.springsecurity.SpringSecurityService

import static com.fhs.evaluation.Evaluation.EvaluationStatus.APPROVED_PUBLISHED
import static com.fhs.evaluation.EvaluationType.ProprietaryType.FTG_RATINGS
import static com.fhs.reports.Rating.Status.FINAL_DEFER
import static com.fhs.reports.Rating.Value.BELOW_FOUR
import static com.fhs.reports.Rating.Value.BELOW_RECOMMENDED
import static com.fhs.reports.RunningScore.calculateRoundedScore
import static com.fhs.reports.ScoreService.FACILITY_SCORE
import static com.fhs.reports.ScoreService.SERVICE_SCORE
import static com.fhs.reports.ScoreService.OVERALL_AGGREGATED_SCORE
import static com.fhs.reports.Rating.Value.FIVE_STAR
import static com.fhs.reports.Rating.Value.FOUR_STAR
import static com.fhs.reports.Rating.Value.RECOMMENDED
import static com.fhs.reports.RunningScore.LockStatus.APPROVED_PUBLISH_LOCK
import static com.fhs.reports.BenchmarksReportService.CompSetReportType.BRAND
import static com.fhs.internal.BenchmarkControl.BB_YEAR_FOR_RATING
import static com.fhs.internal.BenchmarkControl.BB_YEAR_FOR_QA


/**
 * Created by jmoon on 8/19/2019.
 */
class BenchmarksReportService {

    def scoreService

    SpringSecurityService springSecurityService

    static enum CompSetReportType {
        STANDARD, BRAND
    }

    static final COMPETITOR_SECTION_SCORE_AVERAGES_QUERY = "select new map(g.id as brandId, g.name as brandName, rss.section.name as sectionName, avg(rss.score) as score, count(a.id) as assetCount) from AssetGroup g join g.compSetReportYears csy join g.corporateReportAssets cg join cg.asset a join a.evaluations e join e.runningScores rs join rs.runningSectionScore rss where csy.year =:year and e in :evals and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and rss.aggregationType =:aggregationType group by g.id, rss.section.name"

    static final COMPETITOR_CLASSIFICATION_SCORE_AVERAGES_QUERY = "select new map(g.id as brandId, g.name as brandName, rss.classification.name as classificationName, avg(rss.score) as score, count(a.id) as assetCount) from AssetGroup g join g.compSetReportYears csy join g.corporateReportAssets cg join cg.asset a join a.evaluations e join e.runningScores rs join rs.runningClassificationScore rss where csy.year =:year and e in :evals and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and rss.aggregationType =:aggregationType group by g.id, rss.classification.name"


    private List<RunningClassificationScore> evaluationClassificationScores(Evaluation evaluation) {
        RunningClassificationScore.executeQuery("select new map(e.asset.name as displayName, rss.classification.name as classificationName, rss.classification.id as linkId, rss.score as score, rss.aggregationType as aggregateType) from RunningClassificationScore rss inner join rss.runningScore rs inner join rs.evaluation e where rs.evaluation.id = :id and rs.lockStatus = 'APPROVED_PUBLISH_LOCK'", [id: evaluation.id])
    }

    private List<RunningClassificationScore> compSetClassificationScores(CompSet compSet) {
        RunningClassificationScore.executeQuery("select new map(csi.label as displayName, e.asset.name as actualName, rss.classification.name as classificationName, rss.classification.id as linkId, rss.score as score, rss.aggregationType as aggregateType) from RunningClassificationScore rss inner join rss.runningScore rs inner join rs.evaluation e join e.ratings r join r.compSetItems csi join csi.compSet cs where cs = :compSet and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' ",
                [compSet: compSet])
    }

    private List<RunningSectionScore> evaluationSectionScores(Evaluation evaluation) {
        RunningSectionScore.executeQuery("select new map(e.asset.name as displayName, rss.section.name as sectionName, rss.section.id as linkId, rss.section.sequence as sequence, rss.score as score, rss.aggregationType as aggregateType) from RunningSectionScore rss inner join rss.runningScore rs inner join rs.evaluation e where rs.evaluation.id = :id and rs.lockStatus = 'APPROVED_PUBLISH_LOCK'", [id: evaluation.id])
    }

    private List<RunningSectionScore> compSetSectionScores(CompSet compSet) {
        RunningSectionScore.executeQuery("select new map(csi.label as displayName, e.asset.name as actualName, rss.section.name as sectionName, rss.section.id as linkId, rss.score as score, rss.aggregationType as aggregateType) from RunningSectionScore rss inner join rss.runningScore rs inner join rs.evaluation e join e.ratings r join r.compSetItems csi join csi.compSet cs where cs = :compSet and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' ",
                [compSet: compSet])
    }

    def setBrandPromoControl(Integer baseReportDisplayYear, Integer compDataToUseYear) {
        def control = BenchmarkControl.findByBaseReportDisplayYear(baseReportDisplayYear)
        if (!control) {
            control = new BenchmarkControl(baseReportDisplayYear: baseReportDisplayYear)
        }
        control.compDataToUseYear = compDataToUseYear
        control.save()
    }

    def getBenchmarkPromoControl(Integer baseReportDisplayYear) {
        // Brand Benchmarks only works for years 2020 and above
        // TODO Temp Testing : change to 2020 after testing.....
        if (baseReportDisplayYear < 2020) {
            return null
        }

        def control = BenchmarkControl.findByBaseReportDisplayYear(baseReportDisplayYear)
        if (!control) {
            control = new BenchmarkControl(baseReportDisplayYear: baseReportDisplayYear, compDataToUseYear: baseReportDisplayYear)
        }

        return control
    }

    def getBenchmarkYear(Evaluation evaluation) {
        Integer year = evaluation.getDisplayYear()
        BenchmarkControl control = getBenchmarkPromoControl(year)
        year = (control) ? (control.compDataToUseYear - 1) : year
        return year
    }

    def findEligibleEvaluationsForBrandReport(Evaluation evaluation) {
        Integer year = getBenchmarkYear(evaluation)

        def thisYear = Evaluation.executeQuery("select e from AssetGroup g join g.compSetReportYears csy join g.corporateReportAssets cg join cg.asset a join a.evaluations e join e.ratings r where csy.year =:year and e.evaluationType.name = :evaluationType and a.assetType = :assetType and e.evaluationType.standardYear.year = :year and e.inspectionStatus = :inspectionStatus and r.status != :deferred",
                [evaluationType: FTG_RATINGS.name, year: year, assetType: evaluation.asset.assetType, deferred: FINAL_DEFER, inspectionStatus: APPROVED_PUBLISHED])

        // Pull all final ratings reports and get their assets.  If any of them are BELOW_RECOMMENDED or BELOW_FOUR (spas)
        // then we are going to exclude them altogether
        def thisYearAssets = thisYear*.asset
        def assetsToRemove = thisYear.findAll { it.ratings.finalRating.any {it == BELOW_RECOMMENDED || it == BELOW_FOUR } }.collect { it.asset.id }
        thisYear.removeAll { item -> assetsToRemove.find { it == item.asset.id } }

        def lastYear = []

        // Getting
        if (thisYear) {
            lastYear = Evaluation.executeQuery("select e from AssetGroup g join g.compSetReportYears csy join g.corporateReportAssets cg join cg.asset a join a.evaluations e join e.ratings r where csy.year =:year and e.evaluationType.name = :evaluationType and a.assetType = :assetType and e.evaluationType.standardYear.year = :lastYear and e.inspectionStatus = :inspectionStatus and r.status != :deferred and a not in (:thisYearAssets) and r.finalRating IN :ratings",
                    [evaluationType: FTG_RATINGS.name, year: year, lastYear: year - 1, assetType: evaluation.asset.assetType, deferred: FINAL_DEFER, inspectionStatus: APPROVED_PUBLISHED, thisYearAssets: thisYearAssets, ratings: [RECOMMENDED, FOUR_STAR, FIVE_STAR]])
        } else {
            lastYear = Evaluation.executeQuery("select e from AssetGroup g join g.compSetReportYears csy join g.corporateReportAssets cg join cg.asset a join a.evaluations e join e.ratings r where csy.year =:year and e.evaluationType.name = :evaluationType and a.assetType = :assetType and e.evaluationType.standardYear.year = :lastYear and e.inspectionStatus = :inspectionStatus and r.status != :deferred and r.finalRating IN :ratings",
                    [evaluationType: FTG_RATINGS.name, year: year, lastYear: year - 1, assetType: evaluation.asset.assetType, deferred: FINAL_DEFER, inspectionStatus: APPROVED_PUBLISHED, ratings: [RECOMMENDED, FOUR_STAR, FIVE_STAR]])
        }

        return thisYear + lastYear
    }

    def brandOverall(Evaluation evaluation) {
        def eligibleEvaluations = findEligibleEvaluationsForBrandReport(evaluation)

        if (!eligibleEvaluations) {
            return []
        }

        Integer brandYear = getBenchmarkYear(evaluation)
        def brandAverages = RunningScore.executeQuery("select new map(g.id as brandId, g.name as brandName, avg(rs.compositeScore +  rs.manualAdjustmentPercentage / 100) as compositeScore, avg(rs.serviceScore) as serviceScore, avg(rs.facilityScore) as facilityScore, count(a.id) as assetCount) from AssetGroup g join g.compSetReportYears csy join g.corporateReportAssets cg join cg.asset a join a.evaluations e join e.runningScores rs where e in :evals and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and csy.year = :year group by g.id",
                [evals: eligibleEvaluations, year: brandYear])

        anonymizeBrandNames(evaluation, brandAverages)

        return brandAverages
    }

    def overall(CompSet compSet) {
        def overallScores = RunningScore.executeQuery("select new map((rs.compositeScore + rs.manualAdjustmentPercentage / 100) as compositeScore, rs.serviceScore as serviceScore, rs.facilityScore as facilityScore, csi.label as displayName) from RunningScore rs inner join rs.evaluation e join e.ratings r join r.compSetItems csi join csi.compSet cs where cs = :compSet and rs.lockStatus = 'APPROVED_PUBLISH_LOCK'",
                [compSet: compSet])

        return overallScores
    }


    //"Graph Data" are collections of key-value pairs for plotting graph.
    def overallGraphData(RunningScore myRunningScore, competitorOverallScoreData, compSetReportType = CompSetReportType.STANDARD) {
        def composite = []
        if (compSetReportType == CompSetReportType.STANDARD) {
            composite.add([label: "Competitor Avg", score: calculateRoundedScore(competitorOverallScoreData*.compositeScore.sum() / competitorOverallScoreData.size()), dataType: "", assetGroupId: ""])
        }
        competitorOverallScoreData.sort { it.compositeScore }.each {
            def isMyGroup = it.isMyAssetGroup ? "myAssetGroup" : ""
            composite.add([label: (it.isMyAssetGroup ? it.brandName : it.displayName), score: calculateRoundedScore(it.compositeScore), dataType: isMyGroup, assetGroupId: it.brandId])
        }
        composite.add([label: "Your Score", score: myRunningScore.displayAdjustedCompositeScore, dataType: "myScore", assetGroupId: ""])


        def service = []
        if (compSetReportType == CompSetReportType.STANDARD) {
            service.add([label: "Competitor Avg", score: calculateRoundedScore(competitorOverallScoreData*.serviceScore.sum() / competitorOverallScoreData.size()), dataType: "", assetGroupId: ""])
        }
        competitorOverallScoreData.sort { it.serviceScore }.each {
            def isMyGroup = it.isMyAssetGroup ? "myAssetGroup" : ""
            service.add([label: (it.isMyAssetGroup ? it.brandName : it.displayName), score: calculateRoundedScore(it.serviceScore), dataType: isMyGroup, assetGroupId: it.brandId])
        }
        service.add([label: "Your Score", score: myRunningScore.displayServiceScore, dataType: "myScore", assetGroupId: ""])


        def facility = []
        if (compSetReportType == CompSetReportType.STANDARD) {
            facility.add([label: "Competitor Avg", score: calculateRoundedScore(competitorOverallScoreData*.facilityScore.sum() / competitorOverallScoreData.size()), dataType: "", assetGroupId: ""])
        }
        competitorOverallScoreData.sort { it.facilityScore }.each {
            def isMyGroup = it.isMyAssetGroup ? "myAssetGroup" : ""
            facility.add([label: (it.isMyAssetGroup ? it.brandName : it.displayName), score: calculateRoundedScore(it.facilityScore), dataType: isMyGroup, assetGroupId: it.brandId])
        }
        facility.add([label: "Your Score", score: myRunningScore.displayFacilityScore, dataType: "myScore", assetGroupId: ""])


        def data = []
        for(int i = 0;i<composite.size();i++) {
            def serviceScore = service.find { it.label == composite[i].label }?.score
            def facilityScore = facility.find { it.label == composite[i].label }?.score
            data.add([ label: composite[i].label, dataType: '"'+composite[i].dataType+'"', assetGroupId: composite[i].assetGroupId, composite: composite[i].score, service: serviceScore, facility: facilityScore ])
        }

        return [composite: composite, service: service, facility: facility, data: data]
    }


    def brandSectionsRaw(Evaluation evaluation) {
        def myScores = RunningSectionScore.executeQuery("select new map(rss.section.name as sectionName, rss.section.id as linkId, rss.section.sequence as sequence, rss.score as score, rss.aggregationType as aggregateType) from RunningSectionScore rss join rss.runningScore rs inner join rs.evaluation e where e.id = :id and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and e.inspectionStatus IN ('APPROVED_PUBLISHED', 'APPROVED_NOT_PUBLISHED')",
                [id: evaluation.id])

        def benchmarkYear = getBenchmarkYear(evaluation)
        def eligibleEvaluations = findEligibleEvaluationsForBrandReport(evaluation)

        def competitorServiceScores = RunningSectionScore.executeQuery(COMPETITOR_SECTION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: benchmarkYear, aggregationType: SERVICE_SCORE])

        def competitorFacilityScores = RunningSectionScore.executeQuery(COMPETITOR_SECTION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: benchmarkYear, aggregationType: FACILITY_SCORE])

        def overallScores = RunningSectionScore.executeQuery(COMPETITOR_SECTION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: benchmarkYear, aggregationType: OVERALL_AGGREGATED_SCORE])

        //Casino Service is to be removed from reports
        myScores.removeAll { it.sectionName == 'Casino Service' }

        anonymizeBrandNames(evaluation, overallScores)
        anonymizeBrandNames(evaluation, competitorServiceScores)
        anonymizeBrandNames(evaluation, competitorFacilityScores)

        [myServiceScores         : myScores.findAll { it.aggregateType == SERVICE_SCORE }.sort { it.sequence }.groupBy { it.sectionName },
         myFacilityScores        : myScores.findAll { it.aggregateType == FACILITY_SCORE }.groupBy { it.sectionName },
         myOverallScores         : myScores.findAll { it.aggregateType == OVERALL_AGGREGATED_SCORE }.groupBy { it.sectionName },
         overallScores           : overallScores.groupBy { it.sectionName },
         competitorServiceScores : competitorServiceScores.groupBy { it.sectionName },
         competitorFacilityScores: competitorFacilityScores.groupBy { it.sectionName }]
    }


    def brandSectionsCompact(Evaluation evaluation) {
        def rawData = brandSectionsRaw(evaluation)

        return buildCompactSummary(rawData)
    }

    def brandSectionsGraphData(Evaluation evaluation, section = null) {
        def rawData = brandSectionsRaw(evaluation)

        return buildGraphData(rawData, CompSetReportType.BRAND, section, evaluation)
    }

    def brandClassificationsRaw(Evaluation evaluation) {
        def myScores = RunningClassificationScore.executeQuery("select new map(rss.classification.name as classificationName, rss.classification.id as linkId, rss.score as score, rss.aggregationType as aggregateType) from RunningClassificationScore rss join rss.runningScore rs inner join rs.evaluation e where e.id = :id and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and e.inspectionStatus IN ('APPROVED_PUBLISHED', 'APPROVED_NOT_PUBLISHED')",
                [id: evaluation.id])

        def benchmarkYear = getBenchmarkYear(evaluation)
        def eligibleEvaluations = findEligibleEvaluationsForBrandReport(evaluation)

        def competitorServiceScores = RunningClassificationScore.executeQuery(COMPETITOR_CLASSIFICATION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: benchmarkYear, aggregationType: SERVICE_SCORE])

        def competitorFacilityScores = RunningClassificationScore.executeQuery(COMPETITOR_CLASSIFICATION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: benchmarkYear, aggregationType: FACILITY_SCORE])

        def overallScores = RunningClassificationScore.executeQuery(COMPETITOR_CLASSIFICATION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: benchmarkYear, aggregationType: OVERALL_AGGREGATED_SCORE])

        anonymizeBrandNames(evaluation, overallScores)
        anonymizeBrandNames(evaluation, competitorServiceScores)
        anonymizeBrandNames(evaluation, competitorFacilityScores)

        [myServiceScores         : myScores.findAll { it.aggregateType == SERVICE_SCORE }.groupBy { it.classificationName },
         myFacilityScores        : myScores.findAll { it.aggregateType == FACILITY_SCORE }.groupBy { it.classificationName },
         myOverallScores         : myScores.findAll { it.aggregateType == OVERALL_AGGREGATED_SCORE }.groupBy { it.classificationName },
         overallScores           : overallScores.groupBy { it.classificationName },
         competitorServiceScores : competitorServiceScores.groupBy { it.classificationName },
         competitorFacilityScores: competitorFacilityScores.groupBy { it.classificationName }]
    }

    def brandClassificationsCompact(Evaluation evaluation) {
        def rawData = brandClassificationsRaw(evaluation)

        return buildCompactSummary(rawData).sort { it.section }
    }

    def brandClassificationsGraphData(Evaluation evaluation, classification = null) {
        def rawData = brandClassificationsRaw(evaluation)

        return buildGraphData(rawData, CompSetReportType.BRAND, classification, evaluation)
    }


    def sectionsRaw(Evaluation evaluation, CompSet compSet) {
        def myScores = evaluationSectionScores(evaluation)

        def competitorScores = compSetSectionScores(compSet)

        myScores.removeAll { it.sectionName == 'Casino Service' }

        [myServiceScores         : myScores.findAll { it.aggregateType == SERVICE_SCORE }.sort { it.sequence }.groupBy { it.sectionName },
         myFacilityScores        : myScores.findAll { it.aggregateType == FACILITY_SCORE }.groupBy { it.sectionName },
         competitorServiceScores : competitorScores.findAll { it.aggregateType == SERVICE_SCORE }.groupBy { it.sectionName },
         competitorFacilityScores: competitorScores.findAll { it.aggregateType == FACILITY_SCORE }.groupBy { it.sectionName }]
    }

    def sectionsCompact(Evaluation evaluation, CompSet compSet) {
        def rawData = sectionsRaw(evaluation, compSet)

        return buildCompactSummary(rawData)
    }

    def sectionsGraphData(Evaluation evaluation, CompSet compSet, section = null, myAssetGroup = null) {
        def rawData = sectionsRaw(evaluation, compSet)

        return buildGraphData(rawData, CompSetReportType.STANDARD, section, evaluation, myAssetGroup)
    }

    def classificationsRaw(Evaluation evaluation, CompSet compSet) {
        def myScores = evaluationClassificationScores(evaluation)

        def competitorScores = compSetClassificationScores(compSet)

        [myServiceScores         : myScores.findAll { it.aggregateType == SERVICE_SCORE }.groupBy { it.classificationName },
         myFacilityScores        : myScores.findAll { it.aggregateType == FACILITY_SCORE }.groupBy { it.classificationName },
         competitorServiceScores : competitorScores.findAll { it.aggregateType == SERVICE_SCORE }.groupBy { it.classificationName },
         competitorFacilityScores: competitorScores.findAll { it.aggregateType == FACILITY_SCORE }.groupBy { it.classificationName }]
    }

    def classificationsCompact(Evaluation evaluation, CompSet compSet) {
        def rawData = classificationsRaw(evaluation, compSet)

        return buildCompactSummary(rawData).sort { it.section }
    }


    def classificationsGraphData(Evaluation evaluation, CompSet compSet, classification = null, myAssetGroup = null) {
        def rawData = classificationsRaw(evaluation, compSet)

        return buildGraphData(rawData, CompSetReportType.STANDARD, classification, evaluation, myAssetGroup)
    }

    //rawData is assumed to be a collection wherein each element has a field called brandId
    private anonymizeBrandNames(Evaluation evaluation, rawData) {
        def user = springSecurityService.getCurrentUser() as User
        //STAR-10139
        def shouldViewRealName = user?.isA(RoleAuthorities.MGR)

        // STAR-12029 AC4
        rawData.removeAll { it.assetCount < 5 }

        def sortedIds = rawData.collect { it.brandId }.unique().sort()
        rawData.each { it ->
            def isMyBrand = evaluation.asset.corporateReportGroups.any { agd ->
                it.brandId == agd.assetGroup.id
            }

            def n = "Brand ${sortedIds.indexOf(it.brandId) + 1}"
            it.put("displayName", shouldViewRealName || isMyBrand ? it.brandName : n)
        }
    }

    private static buildGraphData(rawData, compSetReportType, pivot, Evaluation evaluation) {
        def compactData = [:]
        def reportData = [:]
        def tempOvrSvcFac = []

        if (!pivot) {
            rawData.myServiceScores.each { k, v ->
                def overall = buildTabularDetails(v, rawData.overallScores.get(k), compSetReportType)
                def service = buildTabularDetails(v, rawData.competitorServiceScores.get(k), compSetReportType)
                def facility = buildTabularDetails(rawData.myFacilityScores.get(k), rawData.competitorFacilityScores.get(k), compSetReportType)

                reportData.put(k, [overall: overall, service: service, facility: facility])
                compactData.put(k, CompSetReportSection.buildForRawSectionData(rawData, k))
                tempOvrSvcFac.add(overall: overall, service: service, facility: facility)
            }
        } else {
            def overall = buildTabularDetails(rawData.myOverallScores.get(pivot.name), rawData.overallScores.get(pivot.name), compSetReportType)
            def service = buildTabularDetails(rawData.myServiceScores.get(pivot.name), rawData.competitorServiceScores.get(pivot.name), compSetReportType)
            def facility = buildTabularDetails(rawData.myFacilityScores.get(pivot.name), rawData.competitorFacilityScores.get(pivot.name), compSetReportType)

            reportData.put(pivot.name, [overall: overall, service: service, facility: facility])
            compactData.put(pivot.name, CompSetReportSection.buildForRawSectionData(rawData, pivot.name))
            tempOvrSvcFac.add(overall: overall, service: service, facility: facility)
        }

        // *********** move myScore and myGroup to back for same score sorting,...
        def dataObj = reportData.get(reportData.keySet().toArray()[0])
        def data = []

        dataObj.overall.each { od ->
            def found = evaluation.asset.corporateReportGroups.find { agd ->
                od.assetGroupId == agd.assetGroup.id
            }
            od.isMyAssetGroup = found ? true : null
            od.isMyAssetGroupName = found ? found.assetGroup.name : ''
        }

        for(int i = 0; i < dataObj.overall.size(); i++) {
            def isMyGroup = ""
            def dataLabel = dataObj.overall[i].label
            def lookupLabel = dataLabel

            if(dataObj.overall[i].isMyAssetGroup) {
                isMyGroup = "myAssetGroup"
                dataLabel = dataObj.overall[i].isMyAssetGroupName
            }

            if(dataObj.overall[i].label == "Your Score") {
                isMyGroup = "myScore"
            }

            def dComposite = dataObj.overall.find { it -> it.label == lookupLabel || it.label == dataLabel }
            def dService   = dataObj.service.find { it -> it.label == lookupLabel || it.label == dataLabel }
            def dFacility  = dataObj.facility.find { it -> it.label == lookupLabel || it.label == dataLabel }

            def dOverallNACheck   = tempOvrSvcFac.overall[0].find { it -> it.label == lookupLabel || it.label == dataLabel }
            def dServiceNACheck   = tempOvrSvcFac.service[0].find { it -> it.label == lookupLabel || it.label == dataLabel }
            def dFacilityNACheck  = tempOvrSvcFac.facility[0].find { it -> it.label == lookupLabel || it.label == dataLabel }

            data.add([ label: dataLabel, dataType: '"'+isMyGroup+'"', assetGroupId: dataObj.overall[i].assetGroupId,
                       composite    : dComposite ? dComposite.score : "",
                       overallNA    : dOverallNACheck  == null || (dService == null || dService?.score == null) ? true : false,
                       serviceNA    : dServiceNACheck  == null || (dService == null || dService?.score == null) ? true : false,
                       facilityNA   : dFacilityNACheck == null || (dFacility == null || dFacility?.score == null) ? true : false,
                       service      : dService ? dService?.score : "",
                       facility     : dFacility ? dFacility?.score : ""]
            )
        }

        data.each{ it ->
            it.service = it.service ? it.service : 0.00
            it.facility = it.facility ? it.facility : 0.00
            it.composite = it.composite ? it.composite : (it.service ? it.service : it.facility)
        }

        // **************************************************************************

        return [compactData: compactData, graphData: reportData, data: data]
    }

    private static buildTabularDetails(myScoreData, competitorScoreData, compSetReportType = CompSetReportType.STANDARD) {
        def tabularDetails = []
        tabularDetails.add([label: "Your Score", score: myScoreData?.score?.first(), assetGroupId: ""])
        if (compSetReportType == CompSetReportType.STANDARD) {
            tabularDetails.add([label: "Competitor Avg", score: competitorScoreData ? competitorScoreData*.score.sum() / competitorScoreData.size() : null, assetGroupId: ""])
        }
        competitorScoreData?.sort { it.score }?.each {
            tabularDetails.add([label: it.displayName, score: it.score, assetGroupId: it.brandId])
        }

        def tempFirst = tabularDetails.first()
        tabularDetails[0] = tabularDetails.last()
        tabularDetails[tabularDetails.size()-1] = tempFirst

//   ********** testing for same scores....
//        println("------------------------------------------")
//        tabularDetails.each{ t ->
//            println(t.label)
//            t.score = 0.50
//        }

        return tabularDetails
    }

    private static buildCompactSummary(rawData) {
        def reportData = []

        rawData.myServiceScores.each { k, v ->
            reportData.add(CompSetReportSection.buildForRawSectionData(rawData, k))
        }

        return reportData
    }

    static anonNameSorter = { it ->
        if (it == "Your Score") {
            "000"
        } else if (it == "Competitor Avg") {
            "001"
        } else if (it == "Your Ranking") {
            "002"
        } else {
            it
        }
    }

    def getRanking(set, val) {
        if (!set || !val) {
            return 'N/A'
        }

        return set.count { it > val } + 1
    }

    def scoredSections(e) {
        return Section.executeQuery("select s from Evaluation e join e.sections s where s.isScoreless = false and s.name != 'Casino Service' and e = :evaluation and exists (select rss from RunningSectionScore rss where rss.runningScore.evaluation = e and rss.section = s)", [evaluation: e]).sort {
            it.sequence
        }
    }

    def ratingOverall(Evaluation evaluation) {
        Integer benchmarkYear = getBenchmarkYear(evaluation)

        RunningScore runningScore = scoreService.fetchRunningScore(evaluation, APPROVED_PUBLISH_LOCK)

        def ratingAverages = Evaluation.executeQuery("select new map(r.finalRating as rating, avg(rs.compositeScore + rs.manualAdjustmentPercentage / 100) as compositeScore, avg(rs.serviceScore) as serviceScore, avg(rs.facilityScore) as facilityScore) from Evaluation e join e.evaluationType et join e.standardYear sy join e.asset a join a.assetType at join e.ratings r join e.runningScores rs where et.name = 'FTG Ratings' and e.inspectionStatus = 'APPROVED_PUBLISHED' and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and r.finalRating IN ('FIVE_STAR', 'FOUR_STAR', 'RECOMMENDED') and r.status = 'FINAL' and a.name NOT LIKE ('%ABC%') and at = :assetType and sy.year = :year group by r.finalRating",
            [assetType: evaluation.asset.assetType, year: benchmarkYear])

        return [overallData: ratingAverages, runningScore: runningScore ]
    }

    def ratingSectionsGraphData(Evaluation evaluation) {
        def benchmarkYear = getBenchmarkYear(evaluation)

        def myScores = RunningSectionScore.executeQuery("select new map(rss.section.name as name, '' as rating, 'myScore' as dataType, rss.score as score, rss.aggregationType as aggregateType) from RunningSectionScore rss join rss.runningScore rs inner join rs.evaluation e where e.id = :id and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and e.inspectionStatus IN ('APPROVED_PUBLISHED', 'APPROVED_NOT_PUBLISHED')",
                [id: evaluation.id])

        def ratingScores = Evaluation.executeQuery("select new map(s.name as name, r.finalRating as rating, s.id as csId, '' as dataType, rss.aggregationType as aggregateType, avg(rss.score) as score) from Evaluation e join e.evaluationType et join e.standardYear sy join e.asset a join a.assetType at join e.ratings r join e.runningScores rs left join rs.runningSectionScore rss join rss.section s where et.name = 'FTG Ratings' and e.inspectionStatus = 'APPROVED_PUBLISHED' and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and r.finalRating IN ('FIVE_STAR', 'FOUR_STAR', 'RECOMMENDED') and r.status = 'FINAL' and a.name NOT LIKE ('%ABC%') and at = :assetType and sy.year = :year group by s.name, r.finalRating, rss.aggregationType",
                [assetType: evaluation.asset.assetType, year: benchmarkYear])

        def scoresBySection = (myScores + ratingScores).groupBy { it.name }

        def sectionScores = [:]
        scoresBySection.each { entry ->
            sectionScores.put(entry.key, entry.value.findAll { it.aggregateType == OVERALL_AGGREGATED_SCORE } + entry.value.findAll { it.aggregateType == SERVICE_SCORE } + entry.value.findAll { it.aggregateType == FACILITY_SCORE })
        }

        def sectionGraphData = []
        sectionScores.each { k, v ->
            sectionGraphData.add(v.groupBy { it.aggregateType } + [name: k])
        }

        return sectionGraphData
    }

    def ratingClassificationsGraphData(Evaluation evaluation) {
        def benchmarkYear = getBenchmarkYear(evaluation)

        def myScores = RunningClassificationScore.executeQuery("select new map(rcs.classification.name as name, '' as rating, 'myScore' as dataType, rcs.aggregationType as aggregateType, rcs.score as score) from RunningClassificationScore rcs join rcs.runningScore rs inner join rs.evaluation e where e.id = :id and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and e.inspectionStatus IN ('APPROVED_PUBLISHED', 'APPROVED_NOT_PUBLISHED')",
                [id: evaluation.id])

        def ratingScores = Evaluation.executeQuery("select new map(c.name as name, r.finalRating as rating, rcs.aggregationType as aggregateType, avg(rcs.score) as score) from Evaluation e join e.evaluationType et join e.standardYear sy join e.asset a join a.assetType at join e.ratings r join e.runningScores rs left join rs.runningClassificationScore rcs join rcs.classification c where et.name = 'FTG Ratings' and e.inspectionStatus = 'APPROVED_PUBLISHED' and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and r.finalRating IN ('FIVE_STAR', 'FOUR_STAR', 'RECOMMENDED') and r.status = 'FINAL' and a.name NOT LIKE ('%ABC%') and at = :assetType and sy.year = :year group by c.name, r.finalRating, rcs.aggregationType",
                [assetType: evaluation.asset.assetType, year: benchmarkYear])

        def scoresByClassification = (myScores + ratingScores).groupBy { it.name }

        def classificationScores = [:]
        scoresByClassification.each { entry ->
            classificationScores.put(entry.key, entry.value.findAll { it.aggregateType == OVERALL_AGGREGATED_SCORE } + entry.value.findAll { it.aggregateType == SERVICE_SCORE } + entry.value.findAll { it.aggregateType == FACILITY_SCORE })
        }

        def classificationGraphData = []
        classificationScores.each { k, v ->
            classificationGraphData.add(v.groupBy { it.aggregateType } + [name: k])
        }

        return classificationGraphData
    }

    def ratingOverallExcel(Evaluation evaluation) {
        Integer benchmarkYear = getBenchmarkYear(evaluation)

        def ratingAverages = Evaluation.executeQuery("select new map(r.finalRating as rating, avg(rs.compositeScore + rs.manualAdjustmentPercentage / 100) as compositeScore, avg(rs.serviceScore) as serviceScore, avg(rs.facilityScore) as facilityScore) from Evaluation e join e.evaluationType et join e.standardYear sy join e.asset a join a.assetType at join e.ratings r join e.runningScores rs where et.name = 'FTG Ratings' and e.inspectionStatus = 'APPROVED_PUBLISHED' and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and r.finalRating IN ('FIVE_STAR', 'FOUR_STAR', 'RECOMMENDED') and r.status = 'FINAL' and a.name NOT LIKE ('%ABC%') and at = :assetType and sy.year = :year group by r.finalRating",
                [assetType: evaluation.asset.assetType, year: benchmarkYear])

        return ratingAverages
    }

    def ratingSectionsExcel(Evaluation evaluation) {
        def benchmarkYear = getBenchmarkYear(evaluation)

        def myScores = RunningSectionScore.executeQuery("select new map(rss.section.name as name, '' as rating, 'myScore' as dataType, rss.score as score, rss.aggregationType as aggregateType) from RunningSectionScore rss join rss.runningScore rs inner join rs.evaluation e where e.id = :id and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and e.inspectionStatus IN ('APPROVED_PUBLISHED', 'APPROVED_NOT_PUBLISHED')",
                [id: evaluation.id])

        def ratingScores = Evaluation.executeQuery("select new map(s.name as name, r.finalRating as rating, s.id as csId, '' as dataType, rss.aggregationType as aggregateType, avg(rss.score) as score) from Evaluation e join e.evaluationType et join e.standardYear sy join e.asset a join a.assetType at join e.ratings r join e.runningScores rs left join rs.runningSectionScore rss join rss.section s where et.name = 'FTG Ratings' and e.inspectionStatus = 'APPROVED_PUBLISHED' and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and r.finalRating IN ('FIVE_STAR', 'FOUR_STAR', 'RECOMMENDED') and r.status = 'FINAL' and a.name NOT LIKE ('%ABC%') and at = :assetType and sy.year = :year group by s.name, r.finalRating, rss.aggregationType",
                [assetType: evaluation.asset.assetType, year: benchmarkYear])

        def competitorOverallScores = ratingScores.findAll { it.aggregateType == OVERALL_AGGREGATED_SCORE }
        def competitorServiceScores = ratingScores.findAll { it.aggregateType == SERVICE_SCORE }
        def competitorFacilityScores = ratingScores.findAll { it.aggregateType == FACILITY_SCORE }

        def results = [overall: ratingExcelSpecs(myScores.findAll { it.aggregateType == OVERALL_AGGREGATED_SCORE }, competitorOverallScores),
                       service: ratingExcelSpecs(myScores.findAll { it.aggregateType == SERVICE_SCORE }, competitorServiceScores),
                       facility: ratingExcelSpecs(myScores.findAll { it.aggregateType == FACILITY_SCORE }, competitorFacilityScores)]

        return results
    }

    def ratingClassificationsExcel(Evaluation evaluation) {
        def benchmarkYear = getBenchmarkYear(evaluation)

        def myScores = RunningClassificationScore.executeQuery("select new map(rcs.classification.name as name, '' as rating, 'myScore' as dataType, rcs.aggregationType as aggregateType, rcs.score as score) from RunningClassificationScore rcs join rcs.runningScore rs inner join rs.evaluation e where e.id = :id and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and e.inspectionStatus IN ('APPROVED_PUBLISHED', 'APPROVED_NOT_PUBLISHED')",
                [id: evaluation.id])

        def ratingScores = Evaluation.executeQuery("select new map(c.name as name, r.finalRating as rating, rcs.aggregationType as aggregateType, avg(rcs.score) as score) from Evaluation e join e.evaluationType et join e.standardYear sy join e.asset a join a.assetType at join e.ratings r join e.runningScores rs left join rs.runningClassificationScore rcs join rcs.classification c where et.name = 'FTG Ratings' and e.inspectionStatus = 'APPROVED_PUBLISHED' and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and r.finalRating IN ('FIVE_STAR', 'FOUR_STAR', 'RECOMMENDED') and r.status = 'FINAL' and a.name NOT LIKE ('%ABC%') and at = :assetType and sy.year = :year group by c.name, r.finalRating, rcs.aggregationType",
                [assetType: evaluation.asset.assetType, year: benchmarkYear])

        def competitorOverallScores = ratingScores.findAll { it.aggregateType == OVERALL_AGGREGATED_SCORE }
        def competitorServiceScores = ratingScores.findAll { it.aggregateType == SERVICE_SCORE }
        def competitorFacilityScores = ratingScores.findAll { it.aggregateType == FACILITY_SCORE }

        def results = [overall: ratingExcelSpecs(myScores.findAll { it.aggregateType == OVERALL_AGGREGATED_SCORE }, competitorOverallScores),
                       service: ratingExcelSpecs(myScores.findAll { it.aggregateType == SERVICE_SCORE }, competitorServiceScores),
                       facility: ratingExcelSpecs(myScores.findAll { it.aggregateType == FACILITY_SCORE }, competitorFacilityScores)]

        return results
    }

    def brandSectionsExcel(Evaluation evaluation) {

        def myScores = RunningSectionScore.executeQuery("select new map(e.asset.name as displayName, rss.section.name as sectionName, rss.section.id as linkId, rss.section.sequence as sequence, rss.score as score, rss.aggregationType as aggregateType) from RunningSectionScore rss join rss.runningScore rs inner join rs.evaluation e where e.id = :id and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and e.inspectionStatus IN ('APPROVED_PUBLISHED', 'APPROVED_NOT_PUBLISHED')",
                [id: evaluation.id])

        def eligibleEvaluations = findEligibleEvaluationsForBrandReport(evaluation)

        Integer brandYear = getBenchmarkYear(evaluation)

        def competitorOverallScores = RunningSectionScore.executeQuery(COMPETITOR_SECTION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: brandYear, aggregationType: OVERALL_AGGREGATED_SCORE])

        def competitorServiceScores = RunningSectionScore.executeQuery(COMPETITOR_SECTION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: brandYear, aggregationType: SERVICE_SCORE])

        def competitorFacilityScores = RunningSectionScore.executeQuery(COMPETITOR_SECTION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: brandYear, aggregationType: FACILITY_SCORE])

        //Casino Service is to be removed from reports
        myScores.removeAll { it.sectionName == 'Casino Service' }
        myScores.sort { it.sequence }

        anonymizeBrandNames(evaluation, competitorOverallScores)
        anonymizeBrandNames(evaluation, competitorServiceScores)
        anonymizeBrandNames(evaluation, competitorFacilityScores)

        def results = [overall: brandSectionExcelSpecs(myScores.findAll { it.aggregateType == OVERALL_AGGREGATED_SCORE }, competitorOverallScores),
                       service: brandSectionExcelSpecs(myScores.findAll { it.aggregateType == SERVICE_SCORE }, competitorServiceScores),
                       facility: brandSectionExcelSpecs(myScores.findAll { it.aggregateType == FACILITY_SCORE }, competitorFacilityScores)]

        return results
    }

    def brandClassificationsExcel(Evaluation evaluation) {

        def myScores = RunningClassificationScore.executeQuery("select new map(e.asset.name as displayName, rss.classification.name as classificationName, rss.classification.id as linkId, rss.score as score, rss.aggregationType as aggregateType) from RunningClassificationScore rss join rss.runningScore rs inner join rs.evaluation e where e.id = :id and rs.lockStatus = 'APPROVED_PUBLISH_LOCK' and e.inspectionStatus IN ('APPROVED_PUBLISHED', 'APPROVED_NOT_PUBLISHED')",
                [id: evaluation.id])

        def eligibleEvaluations = findEligibleEvaluationsForBrandReport(evaluation)

        Integer brandYear = getBenchmarkYear(evaluation)

        def competitorOverallScores = RunningClassificationScore.executeQuery(COMPETITOR_CLASSIFICATION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: brandYear, aggregationType: OVERALL_AGGREGATED_SCORE])

        def competitorServiceScores = RunningClassificationScore.executeQuery(COMPETITOR_CLASSIFICATION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: brandYear, aggregationType: SERVICE_SCORE])

        def competitorFacilityScores = RunningClassificationScore.executeQuery(COMPETITOR_CLASSIFICATION_SCORE_AVERAGES_QUERY,
                [evals: eligibleEvaluations, year: brandYear, aggregationType: FACILITY_SCORE])

        myScores.sort { it.classificationName }

        anonymizeBrandNames(evaluation, competitorOverallScores)
        anonymizeBrandNames(evaluation, competitorServiceScores)
        anonymizeBrandNames(evaluation, competitorFacilityScores)

        def results = [overall: brandClassificationExcelSpecs(myScores.findAll { it.aggregateType == OVERALL_AGGREGATED_SCORE }, competitorOverallScores),
                       service: brandClassificationExcelSpecs(myScores.findAll { it.aggregateType == SERVICE_SCORE }, competitorServiceScores),
                       facility: brandClassificationExcelSpecs(myScores.findAll { it.aggregateType == FACILITY_SCORE }, competitorFacilityScores)]

        return results
    }

    def getBBData(evaluation) {
        def assetGroupData = AssetGroup.executeQuery("select g.assetGroup from CorporateReportGroup g where g.asset.id =:assetId and g.assetGroup.enabled = true", [assetId: evaluation.asset.id])
        RunningScore runningScore = scoreService.fetchRunningScore(evaluation, APPROVED_PUBLISH_LOCK)
        def overallData = brandOverall(evaluation)
        overallData.each { od ->
            def found = assetGroupData.find { agd ->
                od.brandId == agd.id
            }
            od.isMyAssetGroup = found ? true : null
        }
        def graphData = overallGraphData(runningScore, overallData, BRAND)
        def getDataCount = graphData.composite.size()
        def myGroupExist = graphData.composite.findAll { it.dataType == 'myAssetGroup' }.size() > 0


// TODO Temp Testing : remove Restaurant and Spa after testing....
//        def showBBMenu = evaluation?.asset.assetType.name == 'Hotel' && ((evaluation?.isRating() && evaluation?.standardYear.year >= BB_YEAR_FOR_RATING) || (evaluation?.isSER() && evaluation?.standardYear.year >= BB_YEAR_FOR_QA))
        def showBBMenu = (getDataCount > 1) && (evaluation?.asset.assetType.name == 'Hotel' || evaluation?.asset.assetType.name == 'Restaurant' || evaluation?.asset.assetType.name == 'Spa') && ((evaluation?.isRating() && evaluation?.standardYear.year >= BB_YEAR_FOR_RATING) || (evaluation?.isSER() && evaluation?.standardYear.year >= BB_YEAR_FOR_QA))
        return [showBBMenu: showBBMenu, graphData: graphData, overallData: overallData, runningScore: runningScore, myGroupExist: myGroupExist ]

    }


    def getRBData(evaluation){
        def ratingBenchmarkData = ratingOverall(evaluation)

        def graphData = ratingBenchmarkData.overallData
        graphData.add(rating: "Your Score", serviceScore: ratingBenchmarkData.runningScore.serviceScore, facilityScore: ratingBenchmarkData.runningScore.facilityScore, compositeScore: ratingBenchmarkData.runningScore.compositeScore, dataType: '"myScore"')

        graphData.each { it ->
            if(it.dataType != '"myScore"'){
                it.rating = (it.rating).toString() + " Average"
            }
            it.rating = (it.rating).replace("FIVE_STAR","Five-Star")
            it.rating = (it.rating).replace("FOUR_STAR","Four-Star")
            it.rating = (it.rating).replace("RECOMMENDED","Recommended")
            it.dataType = it.dataType ? it.dataType : '""'
            it.compositeScore = calculateRoundedScore(it.compositeScore)
            it.serviceScore = calculateRoundedScore(it.serviceScore)
            it.facilityScore = calculateRoundedScore(it.facilityScore)
        }

        return graphData
    }

    private brandSectionExcelSpecs(myScores, competitorScores) {
        // make sure both my scores and the competitor scores all share the same sections
        def mySections = (myScores.sectionName).intersect(competitorScores.sectionName)
        def combined = myScores + competitorScores
        def allAssets = combined.displayName.unique()
        def orderedExcelRowKeys = combined.findAll { it.sectionName == ((mySections != null && mySections.size() > 0) ? mySections?.first() : "") }
                .sort { it.score }.reverse().displayName
        orderedExcelRowKeys.addAll(allAssets - orderedExcelRowKeys)

        def data = combined.groupBy({ it.displayName }, { it.sectionName })
        return [rowSpec: orderedExcelRowKeys, colSpec: mySections, data: data]
    }

    private brandClassificationExcelSpecs(myScores, competitorScores) {
        // make sure both my scores and the competitor scores all share the same classifications
        def myClassifications = (myScores.classificationName).intersect(competitorScores.classificationName)
        def combined = myScores + competitorScores
        def allAssets = combined.displayName.unique()
        def orderedExcelRowKeys = combined.findAll { it.classificationName == ((myClassifications != null && myClassifications.size() > 0) ? myClassifications?.first() : "") }
                .sort { it.score }.reverse().displayName
        orderedExcelRowKeys.addAll(allAssets - orderedExcelRowKeys)

        def data = combined.groupBy({ it.displayName }, { it.classificationName })
        return [rowSpec: orderedExcelRowKeys, colSpec: myClassifications, data: data]
    }

    private ratingExcelSpecs(myScores, competitorScores) {
        // make sure both my scores and the competitor scores all share the same sections
        def mine = (myScores.name).intersect(competitorScores.name)
        def combined = myScores + competitorScores
        def allRatings = combined.rating.unique()
        def orderedExcelRowKeys = combined.findAll { it.name == ((mine != null && mine.size() > 0) ? mine?.first() : "") }
                .sort { it.score }.reverse().rating
        orderedExcelRowKeys.addAll(allRatings - orderedExcelRowKeys)
        def data = combined.groupBy({ it.rating }, { it.name })

        def d1 =  combined.groupBy({ it.rating })
        def d2 =  combined.groupBy({ it.name })
        def d3 =  combined.groupBy({ it.dataType })
        def d4 =  combined.groupBy({ it.dataType }, { it.name })
        def d5 =  combined.groupBy({ it.rating }, { it.name }, { it.dataType })
        return [rowSpec: orderedExcelRowKeys, colSpec: mine, data: data]
    }


}
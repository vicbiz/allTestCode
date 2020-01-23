

db.AboutUsPage_en.update(
   { _id: "about-us-page" },
   { $set:
      {
	  "block7Title": "",
	  "block7Description": "",
	  "block7ImageURL": "",
	  "block7Link": "",
	  "block8Title": "",
	  "block8Description": "",
	  "block8ImageURL": "",
	  "block8Link": "",
	  "block9Title": "",
	  "block9Description": "",
	  "block9ImageURL": "",
	  "block9Link": ""
      }
   }
)



db.SACMember.copyTo("STCMember")
db.SACPage_en.copyTo("STCPage_en")
    // "_class" : "com.ftg.domain.STCMember",
db.STCMember.updateMany( {}, { $rename: { "sacGroup": "stcGroup" } } )

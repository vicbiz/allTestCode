class GroovyTut {
    static void main(String[] args){
        // def file = new File('./Directory')
        // file.mkdir()


        // def file = new File('./Example.txt')
        // file.delete()

        // def lst = [
        //     {id: 100, info:{name: "Jae Moon"}, age:53, department:"UI"},
        //     {id: 101, info:{name: "Mary Lee"}, age:49, department:"Wife"},
        //     {id: 102, info:{name: "Soo Young Won"}, age:25, department:"Daughter"},
        //     {id: 103, info:{name: "Sae Won"}, age:22, department:"Son"},
        //     {id: 105, info:{name: "Kami"}, age:8, department:"Dog"},
        //     {id: 106, info:{name: "Jini"}, age:6, department:"Cat"},
        // ];
        // def values;
        // values = lst.findAll{ it -> it.info.name ==  "Jae Moon" };
        // println(values);

        // def map = [1:20, a:30, 2:42, 4:34, ba:67, 6:39, 7:49]
        // def minusMap = map.minus([2:42, 4:34]);
        // println(minusMap == [1:20, a:30, ba:67, 6:39, 7:49])

        // minusMap.removeAll{it -> it.key instanceof String}
        // println(minusMap)

        assert 'Red' == [color:'Red', shape:'blue'].get('color', 'Blue')
        assert 'Blue' == [shape:'blue'].get('color', 'Blue')

        def a = ('Red' == [color:'Red', shape:'blue']).get('color', 'Blue')

        println(a);
    }

}
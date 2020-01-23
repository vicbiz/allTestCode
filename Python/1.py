
def main():
    print("Hello Wordl ** " * 5 + "AAAA", end="ZZZZZZZZZ\n")

if __name__ == '__main__':
    main()

print("AAAA")
print("----------------------------------")

a = "123"
b = 3
print(int(a)+b)
print("----------------------------------")

del b
# print(b)
# print("----------------------------------")

var1 = "Guru99!"
var2 = "Software Testing"
print ("var1[0]:",var1[0])
print ("var2[1:5]:",var2[1:5])
print("----------------------------------")

x="Guru" 
print ("u" in x)
print ("l" not in x)
print("----------------------------------")


name = 'guru'
number = 99
print ('%s %d' % (name,number))
print("----------------------------------")

word="guru99 career guru99"	
wordArray = word.split(' ')
print(wordArray[1])
print("----------------------------------")

# In Python, Strings are immutable.
x = "Guru99"
x.replace("Guru99","Python")
print(x)
print("----------------------------------")

x = x.replace("Guru99","Python")
print(x)
print("----------------------------------")

a=(5,6)
b=(1,7)
if (a>b):print("a is bigger")
else: print("b is bigger")
print("----------------------------------")

a = {'x':100, 'y':200}
b = list(a.items())
c = a.items()
d = b[0]
print(b) 
print(c) 
print(d) 
print("----------------------------------")

x = ("f", "a", "b","c", "d", "e")
print(x[2:4])
print(sorted(x))
print("----------------------------------")

y = ["f1", "a1", "b1","c1", "d1", "e1"]
print(y[2:4])
print(sorted(y))
y.sort()
print(y)
print("----------------------------------")

thisdict =	{
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}
print(thisdict)
print("1 ----------------------------------\n")

x = thisdict["model"]
print(x)
print("2 ----------------------------------\n")

for x in thisdict:
  print(x, thisdict[x])
print("3 ----------------------------------\n")

for x in thisdict.values():
  print(x)
print("4 ----------------------------------\n")

for x in thisdict.items():
  print(x)
print("5 ----------------------------------\n")

for x, y in thisdict.items():
  print(x, y)
print("6 ----------------------------------\n")


Dict = {'Tim': 18,'Charlie':12,'Tiffany':22,'Robert':25}	
Boys = {'Tim': 18,'Charlie':12,'Robert':25}
Girls = {'Tiffany':22}	
studentX=Boys.copy()
studentY=Girls.copy()
print(studentX)
print(studentY)
print(Dict)
print("----------------------------------\n")
print("Students Name: %s" % list(Dict.items()))
print("printable string:%s" % str (Dict))
print("----------------------------------\n")

for key in list(Dict.keys()):
    if key in list(Boys.keys()):
        print(key, " : ", True)
    else:       
        print(key, " : ", False)
print("----------------------------------\n")

del Dict ['Charlie']
Dict.update({"Jae Moon":53})
print(Dict)



print("----------------------------------\n")
print("Length : %d" % len (Dict))
print("----------------------------------\n")

Students = list(Dict.keys())
Students.sort()
for S in Students:
    print(":".join((S,str(Dict[S]))))
print("----------------------------------\n")

Students.sort( reverse = True )
for S in Students:
    print(":".join((S,str(Dict[S]))))
print("----------------------------------\n")



L = ["oranges", "apples", "bananas"]
print(sorted(L, reverse = True))
print("----------------------------------\n")



def SwitchExample(argument):
    switcher = {
        0: " This is Case Zero ",
        1: " This is Case One ",
        2: " This is Case Two ",
    }
    return switcher.get(argument, "nothing")


argument = 2
print (SwitchExample(argument))
print("----------------------------------\n")


def a1():
	x=0
	#define a while loop
	while(x <4):
		print(x)
		x = x+1

a1()
print("----------------------------------\n")


for x in range(2,7):
    print(x)
print("----------------------------------\n")

for x in range (10,20):
    if (x == 15): break
    # if (x % 2 == 0) : continue
    print(x)
print("----------------------------------\n")

for x in range (10,20):
    #if (x == 15): break
    if (x % 5 == 0) : continue
    print(x)
print("----------------------------------\n")

Months = ["Jan","Feb","Mar","April","May","June"]
for i, m in enumerate (Months):
    print(i,m)
print("----------------------------------\n")


for i in 'abc':
    print ("guru99",i)
print("----------------------------------\n")


# Example file for working with classes
class myClass():
  def method1(self):
      print("Guru99")
        
  def method2(self,someString):    
      print("Software Testing:" + someString)
  
      
def main1():           
  # exercise the class methods
  c = myClass ()
  c.method1()
  c.method2(" Testing is fun")
  
main1()
print("----------------------------------\n")

# Example file for working with classes
class myClass2():
  def method1(self):
      print("Guru99")
        
  
class childClass(myClass2):
  #def method1(self):
        #myClass2.method1(self);
        #print ("childClass Method1")
        
  def method2(self):
        print("childClass method2")     
         
def main2():           
  # exercise the class methods
  c2 = childClass()
  c2.method1()
  #c2.method2()

main2()
print("----------------------------------\n")

# Example Constructor
class User:
    name = ""

    def __init__(self, name):
        self.name = name

    def sayHello(self):
        print("Welcome to Guru99, " + self.name)

User1 = User("Jae Moon")
User1.sayHello()

name = input("What's your name?")
print("Hello, "+name)

'''
Multi line Comments
asdcasc
asdcsdcads
'''

# import only system from os 
from os import system, name 
  
# import sleep to show output for some time period 
from time import sleep 
  
# define our clear function 
def clear(): 
  
    # for windows 
    if name == 'nt': 
        _ = system('cls') 
  
    # for mac and linux(here, os.name is 'posix') 
    else: 
        _ = system('clear') 
  
# print out some text 
print('hello geeks\n'*10) 
  
# sleep for 2 seconds after printing output 
sleep(2) 
  
# now call function we defined above 
clear() 














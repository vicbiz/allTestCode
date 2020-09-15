
words = ['cat','dog','windows','desk','fence']
for i in range(len(words)):
    print(i, words[i])

print()

for n in range(2, 20):
    for x in range(2, n):
        if n % x == 0:
            print(n, 'equals',x, '*', n//x)
            break
        else:
            print(n,' is prime number')
            break

print()


def fib(n):
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
fib(2000)

print()


def ask_ok(prompt, retries=4, reminder='Please try again!'):
    while True:
        ok = input(prompt)
        if ok in ('y', 'ye', 'yes'):
            return True
        if ok in ('n', 'no', 'nop', 'nope'):
            return False
        retries = retries - 1
        if retries < 0:
            raise ValueError('invalid user response')
        print(reminder)
# ask_ok('OK to overwrite the file?', 2, 'Come on, only yes or no!')

print()

def cheeseshop(kind, *arguments, **keywords):
    print("-- Do you have any", kind, "?")
    print("-- I'm sorry, we're all out of", kind)
    for arg in arguments:
        print(arg)
    print("-" * 40)
    for kw in keywords:
        print(kw, ":", keywords[kw])

cheeseshop("Limburger", "It's very runny, sir.",
           "It's really very, VERY runny, sir.",
           shopkeeper="Michael Palin",
           client="John Cleese",
           sketch="Cheese Shop Sketch")

print()


def concat(*args, sep="/"):
    return sep.join(args)

concat("earth", "mars", "venus")


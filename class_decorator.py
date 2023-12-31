class ClassDecorator:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        print("Before function execution")
        self.func(*args, **kwargs)
        print("After function execution")
        # return result

@ClassDecorator
def greet(name):
    print(f"Hello, {name}!")

# Call the decorated function
greet("Alice")
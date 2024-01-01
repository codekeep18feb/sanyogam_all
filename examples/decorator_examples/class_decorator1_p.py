

def decoratorFunc(func,prefix):
    def wrapper( *args, **kwargs):
        print('wrapper ran'+prefix,args,type(args)) 
        func(*args)
    return wrapper


class DecoratorCls:
    def __init__(self,prefix):
        # self.func=func
        self.prefix=prefix

    def __call__(self,func):
        def wrapper(*args,**kwargs):
        # print('wrapper ran'+self.prefix,args,type(args))
            func(*args)
        return wrapper

# @decoratorFunc
@DecoratorCls('soething')
def display(name):
    print('display ran',name)


display('dname')
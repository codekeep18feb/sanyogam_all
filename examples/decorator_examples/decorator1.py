

def decoratorFunc(func,prefix):
    def wrapper( *args, **kwargs):
        print('wrapper ran'+prefix,args,type(args)) 
        func(*args)
    return wrapper

# @decoratorFunc
def display(name):
    print('display ran',name)

# display()

dco_display = decoratorFunc(display,'LOG_LEVEL1')
dco_display('dname')
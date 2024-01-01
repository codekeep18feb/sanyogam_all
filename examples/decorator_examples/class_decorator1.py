

# def decoratorFunc(func,prefix):
#     def wrapper( *args, **kwargs):
#         print('wrapper ran'+prefix,args,type(args)) 
#         func(*args)
#     return wrapper


# class DecoratorCls():
#     def __init__(self,func):
#         self.func=func

#     def __call__(self,*args):
#         def wrapper(*i_args,**i_kwargs):
#             print('wrapper ran',i_args,type(i_args))
#             self.func(*i_args)
#         return wrapper

# # @decoratorFunc
# @DecoratorCls
# def display(name):
#     print('display ran',name)


# display('dname')

class DecoratorCls:
    def __init__(self, prefix):
        self.prefix = prefix

    def __call__(self, func):
        def wrapper(*inner_args, **inner_kwargs):
            print('wrapper ran :: ' + self.prefix)
            func(*inner_args, **inner_kwargs)
        return wrapper

@DecoratorCls(prefix='log_level1')
def display(name):
    print('display ran', name)

display('dname')

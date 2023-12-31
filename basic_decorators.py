


def decorator_func(func):
    def wrapper_func(name):
        print('wrapper func ran')
        func(name)
    return wrapper_func

@decorator_func
def get_my_name(name):
    print('get name ran')
    return name


print(get_my_name('deepak'))
# ret_Val = decorator_func(get_my_name('deepak'))

# print(ret_Val)
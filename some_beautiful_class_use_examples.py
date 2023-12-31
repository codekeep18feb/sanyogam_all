class class_property(object):
    def __init__(self, fget, fset=None):
        self.fget = fget
        self.fset = fset

    def __get__(self, instance, owner):
        return self.fget(owner)

    def __set__(self, instance, value):
        if self.fset:
            self.fset(instance, value)
        else:
            raise AttributeError("can't set attribute")

    def setter(self, fset):
        return type(self)(self.fget, fset)
class MyClass:
    _data = None

    @class_property
    def data(cls):
        return cls._data

    @data.setter
    def data(cls, value):
        cls._data = value

# Example usage
MyClass.data = "Hello, World!"

print(MyClass.data)  # Output: Hello, World!

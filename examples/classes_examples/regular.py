class Person:
    # Class variable
    species = "Homo sapiens"

    def __init__(self, fname, lname, age):
        self.fname = fname
        self.lname = lname
        self.__age = age

    @property
    def age(self):
        return self.__age

    def fullname(self):
        return f'{self.fname} {self.lname}'

    def update_age(self, num):
        if num < 1:
            print('Age can\'t be negative.')
        else:
            self.__age = num

# Example usage
Person.species = 'SOMO SAPIENS'
p2 = Person('Satish', 'Singh', 36)
p1 = Person('Deepak', 'Singh', 30)
print(f'{p1.fullname()} is age of {p1.age}, and belongs to species {p1.species}')

print(f'{p2.fullname()} is age of {p2.age}, and belongs to species {p2.species}')

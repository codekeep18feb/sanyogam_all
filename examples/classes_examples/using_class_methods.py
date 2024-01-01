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

    @classmethod
    def create_person(cls, full_name, age):
        # Split full_name into first and last names
        fname, lname = full_name.split(' ', 1)
        # Create and return a Person instance
        return cls(fname, lname, age)

    @classmethod
    def create_adult(cls, full_name):
        # Create and return a Person instance with age 18
        return cls.create_person(full_name, 18)

# Example usage
p1 = Person.create_person('Deepak Singh', 30)
print(f'{p1.fullname()} is age of {p1.age}, and belongs to species {p1.species}')

p2 = Person.create_adult('Satish Singh')
print(f'{p2.fullname()} is age of {p2.age}, and belongs to species {p2.species}')

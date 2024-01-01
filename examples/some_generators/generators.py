


# def generate_fib():


# 0 1 1 2 3 5 8 13
# def generate_fib(n):
#     res = [0, 1]
#     next_num = None
#     for i in range(2,n):
#         next_num = res[i-1]+res[i-2]
#         res.append(next_num)
#     return res

# # print(generate_fib(6))



def genrator_fib(n):
    a,b = 0,1
    yield a
    yield b
    # res = [0, 1]
    # next_num = None
    for _ in range(2,n):
        a,b = b,a+b
        # next_num = res[i-1]+res[i-2]
        # # res.append(next_num)
        yield b

fib = genrator_fib(7)
print(fib.__iter__().__next__())
print(fib.__iter__().__next__())
print(fib.__iter__().__next__())
print(fib.__iter__().__next__())
print(fib.__iter__().__next__())
print(fib.__iter__().__next__())



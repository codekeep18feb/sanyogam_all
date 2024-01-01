# import requests
# from concurrent.futures import ThreadPoolExecutor


# def fetch_post_data(post_id):
#     url = f'https://jsonplaceholder.typicode.com/posts/{post_id}'
#     response = requests.get(url)
    
#     if response.status_code == 200:
#         data = response.json()
#         print(f"Save here if needd to space:: Post {post_id} fetched: {data['title']}")
#     else:
#         print(f"Failed to fetch Post {post_id}. Status code: {response.status_code}")

# def main():
#     # Number of API requests
#     num_requests = 100
    
#     # Create a ThreadPoolExecutor with a specified number of threads
#     with ThreadPoolExecutor(max_workers=10) as executor:
#         # Submit tasks to the thread pool
#         futures = [executor.submit(fetch_post_data, i) for i in range(1, num_requests + 1)]

#         # Wait for all tasks to complete
#         for future in futures:
#             future.result()

#     print('Before continuing to the rest of the program')

# if __name__ == "__main__":
#     main()


import requests
from concurrent.futures import ThreadPoolExecutor

def fetch_post_data(post_id):
    url = f'https://jsonplaceholder.typicode.com/posts/{post_id}'
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        print(f"Save here if needd to space:: Post {post_id} fetched: {data['title']}")
    else:
        print(f"Failed to fetch Post {post_id}. Status code: {response.status_code}")

def main():
    # Number of API requests
    num_requests = 10
    
    # Create a ThreadPoolExecutor with a specified number of threads
    with ThreadPoolExecutor(max_workers=10) as executor:
        # Submit tasks to the thread pool and immediately call result() to wait for completion
        for i in range(1, num_requests + 1):
            future = executor.submit(fetch_post_data, i)
            print('future',future,type(future))
            
            res = future.result()
            print('res',res,type(res))
    print('Before continuing to the rest of the program')

if __name__ == "__main__":
    main()

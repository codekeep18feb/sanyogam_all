import requests
from multiprocessing import Pool

def fetch_post_data(post_id):
    url = f'https://jsonplaceholder.typicode.com/posts/{post_id}'
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        print(f"Save here if needed to space:: Post {post_id} fetched: {data['title']}")
    else:
        print(f"Failed to fetch Post {post_id}. Status code: {response.status_code}")

def main():
    # Number of API requests
    num_requests = 100
    
    # Create a Pool of worker processes
    with Pool(processes=4) as pool:  # Adjust the number of processes as needed
        # Use the pool to map the function over the range of API requests
        pool.map(fetch_post_data, range(1, num_requests + 1))

    print('Before continuing to the rest of the program')

if __name__ == "__main__":
    main()

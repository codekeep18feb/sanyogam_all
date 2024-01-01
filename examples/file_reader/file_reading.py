

file_path = '/Users/djangoboy/Desktop/workspace/p__prject/sanyogam_all_versions/v2/sanyogam_all/examples/file_reader/myfile.txt'


# Open the file in read-only mode ('r')
with open(file_path, 'r') as file:
    # Read the content of the file
    file_content = file.read()

# Print the content of the file
print(file_content)
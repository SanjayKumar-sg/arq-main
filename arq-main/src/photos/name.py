import os

# Get the current directory
current_dir = os.getcwd()

# List all files with their extensions
files = [f for f in os.listdir(current_dir) if os.path.isfile(os.path.join(current_dir, f))]

# Print the file names with extensions
for file in files:
    print(file)

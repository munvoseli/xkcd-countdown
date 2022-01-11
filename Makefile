all:
	gcc updater.c `pkg-config --cflags --libs libcurl`

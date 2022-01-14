// gcc -o parse parsehashes.c && ./parse && cat framestr.js

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
	FILE* finp = fopen("frames.txt", "r");
	FILE* foutp = fopen("framestr.js", "w");
	char lasthash[65];
	lasthash[0] = 0;
	char* line = NULL;
	size_t len = 0;
	ssize_t nread;
	int res;
	char* hashptr;
	char* timeptr;
	fprintf(foutp, "let framesFull = `");
	while ((nread = getline(&line, &len, finp)) != -1) {
		if (line[0] == ' ') continue;
		hashptr = line + (line[0] == '{' ? 8 : 0);
		res = strncmp(hashptr, lasthash, 64);
		if (res == 0) continue; // same hash as last hash
		// now look for time data
		strncpy(lasthash, hashptr, 64);
		timeptr = hashptr + 64;
		while (*timeptr > ' ') ++timeptr;
		if (*timeptr == ' ') timeptr += 3;
		fprintf(foutp, "%s %s", lasthash, timeptr);
	}
	fprintf(foutp, "`.split(\"\\n\").filter(x=>x.length>0);\n");
	free(line);
	fclose(finp);
	fclose(foutp);
	return 0;
}

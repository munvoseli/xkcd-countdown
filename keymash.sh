if [ "$1" == "" ]
then
	echo "please keymash"
else
	./parse
	git add frames*
	git commit -m "$1"
	git push
fi

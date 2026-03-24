@echo off
cd c:\xampp\htdocs\FoundBid\frontend
npm run build > build.log 2>&1
echo Done >> build.log

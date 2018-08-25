const request = require('request')
const fs = require('fs')
const AdmZip = require('adm-zip');
const compareVersions = require('compare-versions');

console.log("Welcome to the Ping-A-Lot Updater")

request.get('https://raw.githubusercontent.com/The-Hacker894/LOG-A-PING/master/version.txt', function (error, response, body) {
    console.log("Getting GitHub version...")
    if (error && !response.statusCode == 200) return console.log('Could not get version.txt from GitHub repo. Please report this on the repository or on Discord: TheHacker#9367 raizo#0001')
        var gitVer = body

        // From gist https://gist.github.com/TheDistantSea/8021359


        var updateFileZip = "https://github.com/The-Hacker894/LOG-A-PING/archive/v" + gitVer + ".zip" 
        var output = "./update.zip";

        if(!fs.existsSync(`./version.txt`)) {
            // update
            console.log("No ./version.txt file exists. Updating to latest GitHub version...")
        }

        fs.readFile('./version.txt', 'utf8', function(err, localVer) {
            console.log('Getting local version of PING-A-LOT')
            if(compareVersions(localVer, gitVer) == -1) {
                //update
                console.log('Older version detected. Updating to latest GitHub version...')
                request({url: updateFileZip, encoding: null}, function(err, resp, body) {
                    console.log('Downloading latest version...')
                if(err) throw err;
                fs.writeFile(output, body, function(err) {
                    console.log('Writing latest version...')
                });
            });
            var zipFile = new AdmZip(output)
            var zipEntries = zipFile.getEntries()

            console.log('Extracting...')
            zipFile.extractAllTo("./", /*overwrite*/true);
            
            return console.log('Updated to v' + gitVer + '!')
            
            }
            if(compareVersions(localVer, gitVer) == 1) {
                // running newer version
            }
            if(compareVersions(localVer, gitVer) == 0) {
                // up to date
            }
        })
        
    
});
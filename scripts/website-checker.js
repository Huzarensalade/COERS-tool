function pingWebList() {
    // get data list
    var urllist = document.getElementById("websiteListInputField").value.split('\n');

    // prepare list for table
    var domainlist = convertURLtoDomain(urllist)
    domainlist.sort();
    domainlist.reverse();

    // markup standard table
    var htmltable = document.getElementById("websiteListTable");
    var htmlrow = htmltable.insertRow(0);
    var htmlDomainCell = htmlrow.insertCell(0);
    var htmlIPCell = htmlrow.insertCell(1);
    var htmlServerCell = htmlrow.insertCell(2);
    htmlDomainCell.innerHTML = "Domain";
    htmlIPCell.innerHTML = "IP";
    htmlServerCell.innerHTML = "Server";

    // fill table
    domainlist.forEach(element => {
        var dataRow = htmltable.insertRow(1);
        var dataDomainCell = dataRow.insertCell(0);
        var dataIPCell = dataRow.insertCell(1);
        var dataServerCell = dataRow.insertCell(2);
        dataDomainCell.innerHTML = element;

        pingDomain(element).then(function(response) {
            // fill ip & server in table
            if (response == "81.18.160.154" || response == "coers11.coersonline.nl.") {
                dataIPCell.innerHTML = response;
                dataIPCell.style.backgroundColor = "#00B050";
                dataServerCell.innerHTML = "Coers 11";
                dataServerCell.style.backgroundColor = "#00B050";
            } else if (response == "81.18.160.88") {
                dataIPCell.innerHTML = response;
                dataIPCell.style.backgroundColor = "#00B050";
                dataServerCell.innerHTML = "Server 11";
                dataServerCell.style.backgroundColor = "#00B050";
            } else if (response == "81.18.160.131") {
                dataIPCell.innerHTML = response;
                dataIPCell.style.backgroundColor = "#00B050";
                dataServerCell.innerHTML = "Server 14";
                dataServerCell.style.backgroundColor = "#00B050";
            } else if (response == "81.18.160.110") {
                dataIPCell.innerHTML = response;
                dataIPCell.style.backgroundColor = "#00B050";
                dataServerCell.innerHTML = "Server 17";
                dataServerCell.style.backgroundColor = "#00B050";
            } else if (response == 404) {
                dataIPCell.innerHTML = response;
                dataIPCell.style.backgroundColor = "#FF0000";
                dataServerCell.innerHTML = "No Response";
                dataServerCell.style.backgroundColor = "#FF0000";
            } else {
                dataIPCell.innerHTML = response;
                dataIPCell.style.backgroundColor = "#00B050";
                dataServerCell.innerHTML = "Niet bij COERS";
                dataServerCell.style.backgroundColor = "#FF9900";
            }
        })
    });
}

function convertURLtoDomain(inputList) {
    var outputList = [];
    inputList.forEach(element => {
        // remove HTTP / HTTPS
        var removedHTTP;
        if (element.startsWith("http://")) {
            removedHTTP = element.slice(7);
        } else if (element.startsWith("https://")) {
            removedHTTP = element.slice(8);
        } else {
            removedHTTP = element;
        }
        
        // remove www.
        var removedWWW;
        if (removedHTTP.startsWith("www.")) {
            removedWWW = removedHTTP.slice(4);
        } else {
            removedWWW = removedHTTP;
        }

        // remove subpages
        var removedSubpages = removedWWW.split('/')[0];

        outputList.push(removedSubpages)
    });

    return outputList;
}

async function pingDomain(hostname) {
    var response = await fetch('https://dns.google/resolve?name=' + hostname);
    var json = await response.json();
    if (json.hasOwnProperty('Answer')) {
        return json.Answer[0].data
    } else {
        return 404;
    }

}
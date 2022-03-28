let personalImformationDictionary = {};



function GetPersonalImformationObject(personalImformationType){
    switch(personalImformationType){
        case "job":
            return job;
        case "nationality":
            return nationality;
    }
}
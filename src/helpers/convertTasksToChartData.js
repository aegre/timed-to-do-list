import { formatDateSimple } from "./formatDate";

export const converTaskToChartData = tasks => {
   
    const dic = getLastSevenDaysDictionary();
    const arr = [];
    tasks.forEach( task => {
        const actualKey = formatDateSimple(new Date(task.finishDate));
        if(dic[actualKey])
        {
            dic[actualKey].count+=1;
            dic[actualKey].totalTime+=task.elapsed;
            dic[actualKey].expectedTime+=task.duration;
        }
    });

    for(let prop in dic)
    {
        //Convert to minutes
        dic[prop].totalTime/= 60;
        dic[prop].expectedTime/= 60;
        
        arr.push(dic[prop]);
    }

    return arr;
}

const getLastSevenDaysDictionary = () => {
    
    const obj = {}
    //get the lastest seven days
    for(let i = 6; i >= 0; i--)
    {
        const date = getPastDate(i);
        const name = formatDateSimple(date);
        obj[name] = { name: name.slice(0,5), count: 0, totalTime: 0, expectedTime: 0 };
    }


    return obj;
}

const getPastDate = pastDays => {
    let res = new Date();
    res.setDate(res.getDate() - pastDays);
    return res;
}
    
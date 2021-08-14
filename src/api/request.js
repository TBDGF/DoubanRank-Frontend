const BASE_URL="https://rank.allenji.cn/api"
const LOCAL_URL="https://127.0.0.1:8080/api"

export async function getAllRank(){
    let datasource=[]
    await fetch(
        BASE_URL+"/rank", {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }
    )
        .then(res => res.json())
        .then(res => {
            res.forEach((item, index) => {
                datasource.push({
                    key: index + 1,
                    rank: item.rank_no,
                    groupName: item.group_name,
                    groupMember: item.group_member,
                    commentCount: item.group_comment,
                    averageComment: (item.group_comment/item.group_member).toFixed(2),
                    updateTime: item.update_time,
                    groupUrl:item.group_url,
                });
            })
        })
        .catch(e => console.log('错误:', e))
    return datasource
}

export async function getSearchRank(group_name){
    let datasource=[]
    await fetch(
        BASE_URL+"/search?group_name="+group_name, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }
    )
        .then(res => res.json())
        .then(res => {
            res.forEach((item, index) => {
                datasource.push({
                    key: index + 1,
                    rank: item.rank_no,
                    groupName: item.group_name,
                    groupMember: item.group_member,
                    commentCount: item.group_comment,
                    averageComment: (item.group_comment/item.group_member).toFixed(2),
                    updateTime: item.update_time,
                    groupUrl:item.group_url,
                });
            })
        })
        .catch(e => console.log('错误:', e))
    return datasource
}
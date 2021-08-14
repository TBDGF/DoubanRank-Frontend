import {Table,Button} from 'antd';
import React from "react";

const {Column} = Table;

const datasource = []

class RankedTable extends React.Component {


    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Table dataSource={this.props.rank} size="middle" pagination={{defaultPageSize: this.props.pageSize,}}>
                    <Column title="排名" dataIndex="rank" key="rank" align="center"/>
                    <Column title="组名" dataIndex="groupName" key="groupName" render={(text, record, index)=> {
                        return <a href={this.props.rank[index].groupUrl} target="_blank">{text}</a>
                    }}/>
                    <Column title="人数" dataIndex="groupMember" key="groupMember" align="center"/>
                    <Column title="活跃讨论数" dataIndex="commentCount" key="commentCount" align="center"/>
                    <Column title="人均讨论数" dataIndex="averageComment" key="averageComment" align="center"/>
                    <Column title="更新时间" dataIndex="updateTime" key="updateTime" align="center"/>
                </Table>
            </div>

        )
    }
}

export default RankedTable
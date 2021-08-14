import './App.css';
import {React,useEffect,useState} from "react";
import {message, Row, Col, Card, Form, Input, Button, Space} from 'antd';
import 'antd/dist/antd.css';
import RankedTable from "./lib/RankedTable";
import {getAllRank, getSearchRank} from "./api/request";


const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


function App() {
    const [searchRank,setSearchRank] = useState(null);
    const [allRank,setAllRank] = useState(null);

    useEffect(()=>{
        getAllRank().then(rank => {
            setAllRank(rank)
        })
        console.log("use effect ended")
    },[])

    const onFinish = (value) => {
        console.log(value)
        console.log(JSON.stringify(value))
        fetch(
            "https://rank.allenji.cn/api/list", {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(value)
            }).then(res => {
            return res.json()
        }).then(res => {
            if (res.status == 0)
                message.success('添加成功');
            else
                message.error('添加失败，请检查格式或联系作者');
        })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onCheckFinish = (value) => {
        getSearchRank(value.group_name).then(rank=>{
            setSearchRank(rank)
        })
    }

    const onCheckFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onClear=()=>{
        setSearchRank(null)
        console.log("clear")
    }

    return (
        <div className="App">
            <>
                <Space direction="vertical">
                    <Row justify="center">
                        <Col>
                            <Card title="豆瓣小组活跃榜" style={{width: 800, background: "rgba(255,255,255,0.8)"}}
                                  bordered={false}>
                                <p>本排名非官方排名，数据仅供参考，大概每周末更新</p>
                                <p>筛选：一周内回复数大于100的</p>
                                <p>单帖超过1000以上的不计入总回复数</p>
                                <h3>by {<a href="https://www.douban.com/group/a-soul/" target="_blank">豆瓣魂组</a>} : {<a
                                    href="https://blog.allenji.cn" target="_blank">Allen ji</a>}</h3>
                            </Card>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <Card style={{width: 800, background: "rgba(255,255,255,0.8)"}}>
                                <RankedTable rank={allRank} pageSize={50}/>
                            </Card>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <Card title="搜索小组" style={{width: 800, background: "rgba(255,255,255,0.8)"}}>
                                <p>(不包括待添加列表)</p>
                                <p>注: 每次更新时，活跃度不足100的小组将会被移除出列表</p>
                                <Form
                                    name="basic"
                                    initialValues={{remember: true}}
                                    onFinish={onCheckFinish}
                                    onFinishFailed={onCheckFinishFailed}
                                    style={{width: 600, margin: "0 auto"}}
                                >
                                    <Form.Item
                                        label="组名"
                                        name="group_name"
                                        rules={[{required: true, message: '请输入小组中文名'}]}
                                    >
                                        <Input placeholder="例如：豆瓣魂组"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            提交
                                        </Button>
                                        <Button type="primary" style={{marginLeft:104}} onClick={onClear}>
                                            清空列表
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <RankedTable rank={searchRank} pageSize={10}/>
                            </Card>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <Card title="没有找到您想看到的小组？" style={{width: 800, background: "rgba(255,255,255,0.8)"}}>
                                <p>由于作者较难获取豆瓣所有的小组列表，所以只是简单爬取了一下“讨论精选”板块</p>
                                <p>别担心，在下面提交你的小组链接，我会在下一周期加上您提交过的小组</p>
                                <p>如果您的小组为私密小组，请将作者{<a href="https://www.douban.com/people/238444551/" target='_blank'>@AllenJi</a>}拉进您的小组内!</p>
                                <Form
                                    name="basic"
                                    // labelCol={{span: 8}}
                                    // wrapperCol={{span: 16}}
                                    initialValues={{remember: true}}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    style={{width: 600, margin: "0 auto"}}
                                >
                                    <Form.Item
                                        label="小组网页链接"
                                        name="group_url"
                                        rules={[{required: true, message: '请输入小组网页链接'}]}
                                    >
                                        <Input placeholder="例如：https://www.douban.com/group/a-soul/"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            提交
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Card style={{width: 800, background: "rgba(255,255,255,0.8)"}} bordered={false}>
                            <p>联系我: rtbdgf@163.com</p>
                        </Card>
                    </Row>
                </Space>
            </>
        </div>
    );
}

export default App;

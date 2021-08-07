import './App.css';
import {message, Row, Col, Card, Form, Input, Button, Space} from 'antd';
import 'antd/dist/antd.css';
import RankedTable from "./lib/RankedTable";

function App() {
    const onFinish = (value) => {
        console.log(value)
        console.log(JSON.stringify(value))
        fetch(
            "https://rank.allenji.cn/api/list", {
                method: "post",
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(value)
        }).then(res => {
                return res.json()
        }).then(res=>{
            if(res.status==0)
                message.info('添加成功');
            else
                message.info('添加失败，请检查格式或联系作者');
        })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="App">
            <>
                <Space direction="vertical">
                    <Row justify="center">
                        <Col>
                            <Card title="豆瓣小组活跃榜" style={{width: 800, background: "rgba(255,255,255,0.8)"}}
                                  bordered={false}>
                                <p>本排名非官方排名，数据仅供参考，每周随缘更新</p>
                                <p>筛选：一周内回复数大于100的</p>
                                <p>单帖超过1000以上的不计入总回复数</p>
                                <h3>by 豆瓣魂组:{<a href="https://blog.allenji.cn">Allen ji</a>}</h3>
                            </Card>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <Card style={{width: 800, background: "rgba(255,255,255,0.8)"}}>
                                <RankedTable/>
                            </Card>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <Card title="没有找到您想看到的小组？" style={{width: 800, background: "rgba(255,255,255,0.8)"}}>
                                <p>由于作者较难获取豆瓣所有的小组列表，所以只是简单爬取了一下“讨论精选”板块</p>
                                <p>别担心，在下面提交你的小组链接，我会在下一周期加上您提交过的小组</p>
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

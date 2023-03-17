import React, {useState, useCallback} from 'react';
import { Layout, Button } from 'antd';
import { RenderFields } from './components/RenderFields';
import { CheckOutlined, CoffeeOutlined } from '@ant-design/icons';
import { mockConfiguration } from './mock-data';

const {Header, Content, Footer} = Layout

const App: React.FC =
 () => {

  const [isReadyStatus, setStatus] = useState(false)

  const getInputsData = useCallback((data: {[key: string]: string}, isFormReady: boolean) => {

    setStatus(isFormReady)
  }, [])

  const onSubmit = () => {
    console.log('Sumbit called')
  }

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Header style={{textAlign: 'center'}}>
        <span style={{color: 'white', fontSize: '1rem', fontWeight: 'bold'}}>Test App: ultimate render component!</span>
      </Header>

      <Layout style={{display: 'flex', justifyContent: 'center', margin: 'auto', flexDirection: 'column', padding: '2rem'}}>
        <div style={{display: 'flex', alignItems: 'end'}}>
          <span>Привет</span>
          <CoffeeOutlined style={{fontSize: 33}}/>
        </div>

        <h4 style={{maxWidth: '350px', width: '100%'}}>Чтобы зайти ко мне в гости, пожалуйста, отдай мне свои данные</h4>
      </Layout>

      <Content
        style={{minHeight: '65vh', backgroundColor: 'white', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end', paddingBottom: '1rem'}}>
            <RenderFields
              configuration={mockConfiguration}
              setInputsData={getInputsData}/>
            <Button
              onClick={onSubmit}
              disabled={!isReadyStatus}
              type="primary"
              shape="round"
              icon={<CheckOutlined />}
              >
                Submit
              </Button>
          </div>
      </Content>
      <Footer style={{ textAlign: 'center'}}>
        Created by huge developer's mind <a href='https://www.linkedin.com/in/sirborstheyounger/' target="_blank" rel="noreferrer">@Vadzim Mikutsevich</a>
      </Footer>
    </Layout>
  );
}

export default App;

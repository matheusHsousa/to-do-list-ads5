import DrawerAppBar from "./subcomponents/toolbar/ToolBar";
import ContentHome from "./subcomponents/ContentHome/ContentHome"

const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DrawerAppBar />
            <div className="padding-300" style={{ marginTop: '64px' }}>
            <ContentHome />
            </div>
        </div>
    );
}

export default Home;

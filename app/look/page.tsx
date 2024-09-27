import Layout from '../../components/myComponent/Layout';

const HomePage = () => {
    return (
        <Layout>
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-2xl">Welcome to the Dashboard</h2>
                <p>This is the main content area.</p>
            </div>
        </Layout>
    );
};

export default HomePage;

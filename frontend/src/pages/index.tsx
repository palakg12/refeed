import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Task Management App</h1>
      <TaskList />
    </div>
  );
};

export default Home;

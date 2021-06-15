import CreateCourse from './components/CreateCourse';
import RegisterUser from './components/RegisterUser';
import HomeScreen from './components/HomeScreen';
import CreateUniversity from './components/CreateUniversity';
import CreateFaculty from './components/CreateFaculty';
import CreateTutorialSession from './components/CreateTutorialSession';
import LoginUser from './components/LoginUser';
import ShowTutorialSessions from './components/ShowTutorialSessions';
const routes = [
    {
        path: '/home',
        component: HomeScreen
    },
    {
        path: '/login-user',
        component: LoginUser
    },
    {
        path: '/register-user',
        component: RegisterUser
    },
    {
        path: '/create-course',
        component: CreateCourse,
        permission: 'tutor'
    },
    {
        path: '/create-university',
        component: CreateUniversity,
        permission: 'admin'
    },
    {
        path: '/create-faculty',
        component: CreateFaculty,
        permission: 'admin'
    },
    {
        path: '/create-tutorial-session',
        component: CreateTutorialSession,
        permission: 'admin'
    },
    {
        path: '/show-sessions',
        component: ShowTutorialSessions
    }
];

export default routes;

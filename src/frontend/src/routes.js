import CreateCourse from './components/CreateCourse';
import RegisterUser from './components/RegisterUser';
import HomeScreen from './components/HomeScreen';
import CreateUniversity from './components/CreateUniversity';
import CreateFaculty from './components/CreateFaculty';
import CreateOffering from './components/CreateOffering';
import LoginUser from './components/LoginUser';

const routes = [
    {
        path: '/',
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
        path: '/create-offering',
        component: CreateOffering,
        permission: 'admin'
    }
];

export default routes;

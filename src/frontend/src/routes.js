import CreateCourse from './components/CreateCourse';
import RegisterUser from './components/RegisterUser';
import HomeScreen from './components/HomeScreen';
import CreateUniversity from './components/CreateUniversity';
import CreateFaculty from './components/CreateFaculty';
import CreateTutorialSession from './components/CreateTutorialSession';
import LoginUser from './components/LoginUser';
import ShowTutorialSessions from './components/ShowTutorialSessions';
import BookSession from './components/BookSession';
import ListUserSessions from './components/ListUserSessions';
import ManageSessions from './components/ManageSessions';
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
        permission: 'tutor'
    },
    {
        path: '/show-sessions',
        component: ShowTutorialSessions
    },
    {
        path: '/book-session/:id',
        component: BookSession
    },
    {
        path: '/list-user-sessions',
        component: ListUserSessions
    },
    {
        path: '/manage-sessions',
        component: ManageSessions
    }
];

export default routes;

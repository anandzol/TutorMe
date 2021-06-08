import React, { Component, useEffect } from 'react';
import axios from 'axios';

class LoginUser extends Component {
    baseURL() {
        return 'http://localhost:8082/api/user';
    }
}

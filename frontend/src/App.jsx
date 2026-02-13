import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import Login from './pages/Auth/Login.jsx';
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard.jsx';
import JobDetails from './pages/JobSeeker/JobDetails.jsx';
import SavedJobs from './pages/JobSeeker/SavedJobs.jsx';
import UserProfile from './pages/JobSeeker/UserProfile.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import EmployerDashboard from './pages/Employer/EmployerDashboard.jsx';
import JobPostingForm from './pages/Employer/JobPostingForm.jsx';
import ManageJobs from './pages/Employer/ManageJobs.jsx';
import ApplicationViewer from './pages/Employer/ApplicationViewer.jsx';
import EmployerProfile from './pages/Employer/EmployerProfile.jsx';

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />

                    <Route path='/find-jobs' element={<JobSeekerDashboard />} />
                    <Route path='/job/:jobId' element={<JobDetails />} />
                    <Route path='/saved-jobs' element={<SavedJobs />} />
                    <Route path='/profile' element={<UserProfile />} />

                    <Route element={<ProtectedRoute requiredRole="employer" />}>
                        <Route path='/employer-dashboard' element={<EmployerDashboard />} />
                        <Route path='/post-job' element={<JobPostingForm />} />
                        <Route path='/manage-jobs' element={<ManageJobs />} />
                        <Route path='/manage-jobs' element={<ManageJobs />} />
                        <Route path='/applicants' element={<ApplicationViewer />} />
                        <Route path='/company-profile' element={<EmployerProfile />} />
                    </Route>

                    <Route path='*' element={<Navigate to='/' replace/>} />
                </Routes>
            </Router>


            
        </div>
    )
}

export default App

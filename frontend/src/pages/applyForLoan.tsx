import LoanForm from "../components/loanForm";
import LoanTable from "../components/loanTable";
import { Container } from '@mui/material';
import '../css/loans.css'

export default function ApplyForLoan() {
    return (
        <Container>
            <LoanForm />
            {/* <LoanTable /> */}
        </Container>
    )
}
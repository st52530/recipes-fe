import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    stepper: {
        backgroundColor: theme.palette.background.default
    }
}));

const RecipeInstructions = ({instructions, editMode = false, onInstructionsChanged}) => {
    const classes = useStyles()

    // TODO: Edit mode!

    // const onSingleInstructionChanged = (index, text) => {
    //     const newInstructions = [...instructions]
    //     newInstructions[index] = text
    //     onInstructionsChanged(newInstructions)
    // }
    //
    // const onInstructionRemoved = (index) => {
    //     const newInstructions = [...instructions]
    //     newInstructions.splice(index, 1)
    //     onInstructionsChanged(newInstructions)
    // }

    const instructionsUi = instructions.map((instruction, index) => (
        <Step key={index} active>
            <StepLabel>Krok {index + 1}</StepLabel>
            <StepContent>
                <Typography>{instruction}</Typography>
            </StepContent>
        </Step>
    ))

    return (
        <>
            <Typography component="h2" variant="h4" gutterBottom>Postup</Typography>
            <Stepper orientation="vertical" className={classes.stepper}>
                {instructionsUi}
            </Stepper>
        </>
    )
}

export default RecipeInstructions

RecipeInstructions.propTypes = {
    instructions: PropTypes.array,
    editMode: PropTypes.bool,
    onInstructionsChanged: PropTypes.func
};
import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    stepper: {
        backgroundColor: theme.palette.background.default
    }
}));

const RecipeInstructions = ({instructions, editMode = false, onInstructionsChanged}) => {
    const classes = useStyles()

    const onSingleInstructionChanged = (index, text) => {
        const newInstructions = [...instructions]
        newInstructions[index].text = text
        onInstructionsChanged(newInstructions)
    }

    const onInstructionRemoved = (index) => {
        const newInstructions = [...instructions]
        newInstructions.splice(index, 1)
        onInstructionsChanged(newInstructions)
    }

    const instructionsUi = instructions.map((instruction, index) => (
        <Step key={instruction.id || instruction.localId} active>
            <StepLabel>Krok {index + 1}</StepLabel>
            <StepContent>
                {editMode ? (
                    <>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            label="Instrukce"
                            fullWidth
                            value={instruction.text}
                            onChange={(e) => onSingleInstructionChanged(index, e.target.value)}/>
                        <Button
                            variant="contained"
                            onClick={() => onInstructionRemoved(index)}
                            color="primary">
                            Odebrat krok
                        </Button>
                    </>
                ) : (
                    <Typography>{instruction.text}</Typography>
                )}
            </StepContent>
        </Step>
    ))

    return (
        <>
            <Typography component="h2" variant="h4" gutterBottom>Postup</Typography>
            <Stepper orientation="vertical" className={classes.stepper}>
                {instructionsUi}
                {editMode && (
                    <Step key="next-step" active>
                        <StepLabel>Další krok</StepLabel>
                        <StepContent>
                            <Button
                                variant="contained"
                                onClick={() => onInstructionsChanged([...instructions, {
                                    localId: Math.floor(Math.random() * 1000),
                                    text: ""
                                }])}
                                color="primary">
                                Přidat další
                            </Button>
                        </StepContent>
                    </Step>
                )}
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
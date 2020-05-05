import React from 'react';
import {
    useParams
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import RecipeDetailHeader from "./RecipeDetailHeader";
import Container from '@material-ui/core/Container';
import {getRecipeImageUrl} from "../../services/RecipeService";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        top: -50
    },
}));

const RecipeDetailPage = () => {
    const classes = useStyles()
    const {id} = useParams()

    return (
        <>
            <RecipeDetailHeader name={"TODO delsi titulek nebo jeste mnohem delsi"} imageUrl={getRecipeImageUrl(id)}/>
            <Container maxWidth="md" className={classes.root}>
                <Typography component="p">Nadýchané a voňavé kynuté buchty naplněné povidly ovoněnými kapkou rumu jsou
                    nejlepší bohatě poprášené moučkovým cukrem.</Typography>

                <Typography component="h2" variant="h4">Postup</Typography>
                <Typography component="p">V malé misce za pomoci lžíce rozetřete na hladkou kašičku rozdrobené droždí se
                    lžící cukru. Přilijte polovinu teplého mléka (v mléce udržíte prst) a nechte na teplém místě vzejít
                    kvásek, asi 10 minut.

                    Do mísy kuchyňského robota nebo do velké mísy nasypte zbylý cukr, mouku, citronovou kůru a špetku
                    soli, vše promíchejte. Přilijte vzešlý kvásek, zbylé mléko, rozpuštěné máslo a vejce. Hákem za nízké
                    rychlosti nebo vařečkou vypracujte hladké měkké těsto. Zpracovávejte ho alespoň 10 minut.

                    Jinou mísu vytřete olejem a přendejte do ní těsto a vytvořte z něj bochánek. Zakryjte utěrkou a
                    nechte v pokojové teplotě kynout minimálně hodinu a půl. Povidla nechte v pokojové teplotě povolit a
                    metlou promíchejte s tuzemákem. Pekáč vylijte rozpuštěným máslem. Troubu předehřejte na 200 °C.

                    Těsto vyklopte na lehce pomoučněnou plochu a rozdělte na 12 (16 či 20) stejných dílů. Každý
                    roztáhněte na placku a doprostřed dejte lžíci povidel. Okraje opatrně spojte nad povidly tak, aby
                    vznikla kulatá buchta. Obalte ji v másle v pekáči a pokračujte s ostatními kousky. Skládejte je
                    těsně vedle sebe (3 x 4, 4 x 4 nebo 5 x 4). Zakryjte je utěrkou a nechte ještě 20 minut kynout.

                    Do předehřáté trouby vložte buchty, teplotu snižte na 180 °C a pečte dozlatova, asi 30 minut.
                    Mezitím promíchejte rozpuštěné máslo s tuzemákem a smetanou. Hotové horké buchty směsí potřete a
                    vychladlé pocukrujte.</Typography>

            </Container>
        </>
    )
}

export default RecipeDetailPage
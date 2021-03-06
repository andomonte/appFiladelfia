import { Box, Grid, Paper, Button, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import Progresso from 'src/utils/progressoDisable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    fontSize: '16px',
  },
  novoBox2: {
    flexGrow: 1,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '16px',
  },
  button1: {
    display: 'flex',
    background: 'red',
    '&:hover': {
      backgroundColor: 'red',
    },
    borderRadius: 30,
    fontSize: '14px',
    width: 'auto',
    minWidth: 100,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
}));

function RelCelula({ dadosRelVisita, setSendResumo }) {
  const classes = useStyles();
  //= ================================================================
  //  const InicialNCelula = { label: 'Escolha...', value: 0 };
  const [necessidades, setNecessidades] = React.useState('');
  const [obstaculos, setObstaculos] = React.useState('');
  const [acoes, setAcoes] = React.useState('');
  const [progresso, setProgresso] = React.useState(dadosRelVisita.Progresso);
  const progressoInicial = Number(dadosRelVisita.Progresso);

  React.useEffect(() => {
    if (dadosRelVisita) {
      const obj = JSON.parse(dadosRelVisita.Necessidades);
      let strNecessidade = '';
      for (let i = 0; i < obj.length; i += 1) {
        if (strNecessidade !== '')
          strNecessidade = `${String(strNecessidade)}${obj[i]},`;
        else strNecessidade = `${obj[i]}`;
      }
      setNecessidades(strNecessidade);

      const objObst = JSON.parse(dadosRelVisita.Obstaculos);
      let strObst = '';
      for (let i = 0; i < objObst.length; i += 1) {
        if (strObst !== '') strObst = `${String(strObst)}${objObst[i]},`;
        else strObst = `${objObst[i]}`;
      }
      setObstaculos(strObst);

      const objAcao = JSON.parse(dadosRelVisita.Acao);
      let strAcao = '';
      for (let i = 0; i < objAcao.length; i += 1) {
        if (strAcao !== '') strAcao = `${String(strAcao)}${objAcao[i]},`;
        else strAcao = `${objAcao[i]}`;
      }
      setAcoes(strAcao);
    }
  }, []);

  return (
    <Box height="90vh" minHeight={500} width="100vw">
      <Box
        height="100%"
        minWidth={300}
        width="100%"
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box height="100%" width="100%" minWidth={300}>
          <Box height="100%">
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={400}
              width="100%"
              bgcolor={corIgreja.principal}
            >
              <Box width="94%">
                <Box
                  m="2vh"
                  color="white"
                  fontFamily="arial black"
                  fontSize="16px"
                  textAlign="center"
                >
                  RELAT??RIO DE COORDENA????O
                </Box>
                <Grid container item xs={12} spacing={0}>
                  <Grid item xs={6}>
                    <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Data de In??cio
                      </Typography>
                    </Box>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box
                        fontSize="16px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height={50}
                      >
                        {dadosRelVisita.Data}
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={1} />

                  <Grid item xs={5}>
                    <Box mt={0} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Supervis??o
                      </Typography>
                    </Box>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 45,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          {dadosRelVisita.CelulaVisitada}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Box
                  flexDirection="column"
                  display="flex"
                  justifyContent="center"
                  width="100%"
                >
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Necessidades Encontradas
                    </Typography>
                  </Box>
                  <Grid item xs={12}>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 75,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={85}
                          textAlign="center"
                        >
                          {necessidades}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Box>
                <Box
                  flexDirection="column"
                  display="flex"
                  justifyContent="center"
                  width="100%"
                >
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Obst??culos Encontrados
                    </Typography>
                  </Box>
                  <Grid item xs={12}>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 75,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={85}
                          textAlign="center"
                        >
                          {obstaculos}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Box>
                <Box
                  flexDirection="column"
                  display="flex"
                  justifyContent="center"
                  width="100%"
                >
                  <Box mt="2vh" ml={2} color="white" sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Plano de A????o
                    </Typography>
                  </Box>
                  <Grid item xs={12}>
                    <Paper
                      style={{
                        background: '#fafafa',
                        height: 75,
                        marginTop: -5,
                        width: '100%',
                      }}
                    >
                      <Box mt={-0.8} width="100%">
                        <Box
                          fontSize="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={85}
                          textAlign="center"
                        >
                          {acoes}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Box>
                <Grid item xs={11}>
                  <Box
                    textAlign="center"
                    mt="2vh"
                    color="white"
                    sx={{ fontSize: 'bold' }}
                  >
                    <Typography variant="caption" display="block" gutterBottom>
                      {progresso}% de Desenvolvimento da A????o
                    </Typography>
                  </Box>
                  <Box ml={2} mt={-2}>
                    <Progresso
                      percentual={progressoInicial}
                      setPercentual={setProgresso}
                    />
                  </Box>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={12}>
                    <Box className={classes.novoBox} mt={-1}>
                      <Button
                        style={{
                          color: 'white',
                          borderRadius: '10px',
                          fontFamily: 'arial black',
                          background: corIgreja.tercenaria,
                          width: '100%',
                        }}
                        onClick={() => {
                          setSendResumo(false);
                        }}
                        variant="contained"
                        severity="success"
                      >
                        VOLTAR
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RelCelula;

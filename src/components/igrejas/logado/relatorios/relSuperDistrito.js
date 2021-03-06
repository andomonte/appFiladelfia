import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import MostrarRelatorioGeral from 'src/components/igrejas/logado/relatorios/coordenador/mostrarRelCoord';
import MostrarRelatorioVisita from 'src/components/igrejas/logado/relatorios/coordenador/mostrarRelVisitaCoord';

import Meses from 'src/utils/mesesAbrev';
import TamanhoJanela from 'src/utils/getSize';
import TabRelSuperGeral from './coordenador/aba/tabRelSuperCoord';
import TabRelSuperVisita from './coordenador/aba/tabRelVisitaCoord';

const janela = TamanhoJanela();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fontResponsive: {
    fontSize: '3vw',

    [theme.breakpoints.up('sm')]: {
      fontSize: '1.8vw',
    },
    [theme.breakpoints.up('lg')]: { fontSize: '1.3vw' },
  },
  fontResponsive16: {
    fontSize: '4vw',
    [theme.breakpoints.down('sm')]: {
      fontSize: '4vw',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5vw',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.8vw',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4vw',
    },
  },
}));

function PlanMembro({ perfilUser, lideranca }) {
  const classes = useStyles();
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);
  const [sendResumo, setSendResumo] = React.useState(false);
  const [dadosRelVisita, setDadosRelVisita] = React.useState(false);

  const [contSuper, setContSuper] = React.useState(0);

  // limitar nomes at?? 30 caracteres ou ultimo espa??o antes de 30
  //= ===================================================================

  const lideresParcial = lideranca.filter(
    (val) =>
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Funcao === 'Supervisor',
  );

  const setor = lideresParcial.sort((a, b) => {
    if (new Date(a.supervisao) > new Date(b.supervisao)) return 1;
    if (new Date(b.supervisao) > new Date(a.supervisao)) return -1;
    return 0;
  });
  const superParcial = setor.map((itens) => itens.supervisao);
  const numeroSuper = [...new Set(superParcial)];

  const handleIncAno = () => {
    let contAnoAtual = contAno + 1;

    if (contAnoAtual > anoAtual) contAnoAtual = anoAtual;
    setContAno(contAnoAtual);
  };
  const handleDecAno = () => {
    let contAnoAtual = contAno - 1;

    if (contAnoAtual < 2022) contAnoAtual = 2022;
    setContAno(contAnoAtual);
  };
  const handleIncMes = () => {
    let contMesAtual = contMes + 1;

    if (contMesAtual > 11) {
      contMesAtual = 0;
      handleIncAno();
    }
    setContMes(contMesAtual);
  };
  const handleDecMes = () => {
    let contMesAtual = contMes - 1;

    if (contMesAtual < 0) {
      contMesAtual = 11;
      handleDecAno();
    }
    setContMes(contMesAtual);
  };

  const tipo = ['Visita', 'Supervis??o'];
  const [contTipo, setContTipo] = React.useState(0);
  const handleIncTipo = () => {
    let contTipoAtual = contTipo + 1;

    if (contTipoAtual > 1) {
      contTipoAtual = 0;
    }
    setContTipo(contTipoAtual);
  };
  const handleDecTipo = () => {
    let contTipoAtual = contTipo - 1;

    if (contTipoAtual < 0) {
      contTipoAtual = 1;
    }
    setContTipo(contTipoAtual);
  };

  const handleIncSuper = () => {
    let contTipoAtual = contSuper + 1;

    if (contTipoAtual >= numeroSuper.length) {
      contTipoAtual = 0;
    }
    setContSuper(contTipoAtual);
  };
  const handleDecSuper = () => {
    let contTipoAtual = contSuper - 1;

    if (contTipoAtual < 0) {
      contTipoAtual = numeroSuper.length - 1;
    }
    setContSuper(contTipoAtual);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      className={classes.fontResponsive}
    >
      <Box
        width="100vw"
        minWidth={300}
        minHeight={450}
        display="flex"
        alignContent="center"
        justifyContent="center"
        height={janela.height > 570 ? '90vh' : '88vh'}
        mt={0}
      >
        {!sendResumo ? (
          <Box height="100%" width="100%" border="4px solid #fff">
            <Box height="100%">
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                bgcolor={corIgreja.principal}
                style={{
                  borderRadius: '16px',
                }}
              >
                <Box mt={2} width="96%" ml={1}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={6}>
                      <Box ml={2} color="white">
                        Selecione o M??s
                      </Box>

                      <Box
                        borderRadius={5}
                        bgcolor="white"
                        width="100%"
                        display="flex"
                      >
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleDecMes();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                            <BiCaretLeft />
                          </IconButton>
                        </Box>
                        <Box
                          width="60%"
                          className={classes.fontResponsive16}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontFamily: 'arial black' }}
                        >
                          {mes[contMes].descricao} / {contAno}
                        </Box>
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncMes();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                            <BiCaretRight />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box ml={2} color="white">
                        Selecione a Supervis??o
                      </Box>

                      <Box
                        borderRadius={5}
                        bgcolor="white"
                        width="100%"
                        display="flex"
                      >
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleDecSuper();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                            <BiCaretLeft />
                          </IconButton>
                        </Box>
                        <Box
                          width="60%"
                          className={classes.fontResponsive16}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontFamily: 'arial black' }}
                        >
                          {numeroSuper[contSuper]}
                        </Box>
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncSuper();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                            <BiCaretRight />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={2} width="96%" ml={1}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Box
                        borderRadius={5}
                        bgcolor="white"
                        width="100%"
                        display="flex"
                      >
                        <Box
                          width="10%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleDecTipo();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                            <BiCaretLeft />
                          </IconButton>
                        </Box>
                        <Box
                          width="100%"
                          className={classes.fontResponsive16}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontFamily: 'arial black' }}
                        >
                          Relat??rio de {tipo[contTipo]}
                        </Box>
                        <Box
                          width="10%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncTipo();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                            <BiCaretRight />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box width="95%" height="100%">
                  <Box
                    height={janela.height > 570 ? '60vh' : '54vh'}
                    minHeight={220}
                    bgcolor="#fafafa"
                    width="100%"
                    mt={2}
                    borderRadius={16}
                  >
                    {contTipo ? (
                      <TabRelSuperGeral
                        numeroSuper={numeroSuper[contSuper]}
                        Mes={contMes}
                        Ano={contAno}
                        perfilUser={perfilUser}
                        lideranca={lideranca}
                        setSendResumo={setSendResumo}
                        setDadosRelVisita={setDadosRelVisita}
                      />
                    ) : (
                      <TabRelSuperVisita
                        perfilUser={perfilUser}
                        Mes={contMes}
                        Ano={contAno}
                        numeroSuper={numeroSuper[contSuper]}
                        lideranca={lideranca}
                        setSendResumo={setSendResumo}
                        setDadosRelVisita={setDadosRelVisita}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            {dadosRelVisita && dadosRelVisita.Necessidades ? (
              <MostrarRelatorioGeral
                dadosRelVisita={dadosRelVisita}
                perfilUser={perfilUser}
                Mes={contMes}
                Ano={contAno}
                setSendResumo={setSendResumo}
              />
            ) : (
              <MostrarRelatorioVisita
                dadosRelVisita={dadosRelVisita}
                perfilUser={perfilUser}
                Mes={contMes}
                Ano={contAno}
                setSendResumo={setSendResumo}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PlanMembro;

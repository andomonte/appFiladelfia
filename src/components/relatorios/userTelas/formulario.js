import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green, yellow } from '@material-ui/core/colors';
import { Box } from '@material-ui/core';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import Loading from 'src/utils/loading';
import AddIcon from '@material-ui/icons/Add';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { useSession, signOut } from 'next-auth/client';
import useSWR, { mutate } from 'swr';
import CircularProgress from '@material-ui/core/CircularProgress';
import MesageErro from 'src/utils/mesageErro';

const fetcher = (url) => axios.get(url).then((res) => res.data);
// const fetcher = (url) => fetch(url).then((r) => r.json());

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignContent: 'center',
  },
  buttonCancel: {
    alignContent: 'center',
    // color: theme.palette.background.primary,
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
      backgroundColor: yellow[700],
    },
  },
  button: {
    alignContent: 'center',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
    '& > *': {
      margin: theme.spacing(2),
      // width: '50ch',
    },
  },
  novoBox: {
    flexGrow: 1,

    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tf_12: {
    // marginLeft: theme.spacing(1),
    //  marginRight: theme.spacing(1),
    width: '500px',

    margin: 10,
    [theme.breakpoints.down('md')]: {
      width: '20',
    },
  },
  tf_m: {
    width: '100%',
    fontSize: '5px',
  },

  tf_6: {
    //    marginRight: 8,
    margin: 10,
    width: '240px',
    textAlign: 'center',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      margin: 10,
      width: '205px',
    },
  },
  tf_4: {
    margin: 10,
    // marginRight: 8,
    width: '155px',
    textAlign: 'center', // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '130px',
    },
  },
  tf_3: {
    margin: 10,
    textAlign: 'center',
    // marginRight: 8,
    width: '150px',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '110px',
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
function formatarMoeda(props) {
  // const elemento = document.getElementById('Ofertas');
  let valor = props;
  valor += '';
  valor = Number(valor.replace(/[\D]+/g, ''));
  valor += '';
  valor = valor.replace(/([0-9]{2})$/g, ',$1');

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
  }
  return String(valor);
  // elemento.value = valor;
}

function formulario({ item, Data, Semana }) {
  const classes = useStyles();

  // const [editar, setEditar] = React.useState(true);

  const mes = String(Number(Data.slice(3, 5)));
  const ano = Data.slice(6, 10);
  const [session] = useSession();

  const [editar, setEditar] = React.useState();
  const [igreja] = React.useState(item[0].igreja);
  const [codigoIgreja] = React.useState(item[0].codigoIgreja);
  const [semana] = React.useState(Semana);
  const [dataRelatorio, setDataRelatorio] = React.useState(Data);
  const [adultos, setAdultos] = React.useState('');
  const [adolecentes, setAdolecentes] = React.useState('');
  const [criancas, setCriancas] = React.useState('');
  const [visitantes, setVisitantes] = React.useState('');
  const [conversoes, setConversoes] = React.useState('');
  const [ofertas, setOfertas] = React.useState('');
  const [dizimos, setDizimos] = React.useState('');
  const [validarAdultos, setValidarAdultos] = React.useState('sim');
  const [validarAdolecentes, setValidarAdolecentes] = React.useState('sim');
  const [validarCriancas, setValidarCriancas] = React.useState('sim');
  const [validarVisitantes, setValidarVisitantes] = React.useState('sim');
  const [validarConversoes, setValidarConversoes] = React.useState('sim');
  const [validarOfertas, setValidarOfertas] = React.useState('sim');
  const [validarDizimos, setValidarDizimos] = React.useState('sim');
  const [contador, setContador] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  //----------------------------------------------------------------------
  // <Number locale="de-DE">{ofertas}</Number>;
  const url = `${window.location.origin}/api/consultaDados/${item[0].codigoIgreja}/${mes}/${ano}`;

  const { data, error } = useSWR(url, fetcher);
  // useSWR('/api/user', (id = 4) => fetcher(id));
  // useSWR('/api/consultaDados', fetcher);
  if (error)
    return (
      <div>
        <MesageErro />
      </div>
    );
  if (!data)
    return (
      <div>
        {' '}
        <Loading />
      </div>
    );

  //---------------------------------------------------------------------------
  const dadosRel = data.filter((val) => val.semana === Semana);
  // console.log('item supervisao', item[0].RegiaoIDPB);
  let DataRelatorio = 'dd/mm/aaaa';
  let sem = Semana;
  let Adultos = '';
  let Adolecentes = '';
  let Crianças = '';
  let Visitantes = '';
  let Conversoes = '';
  let Ofertas = 0;
  let Dizimos = 0;
  let ids = '';
  if (dadosRel.length !== 0) {
    DataRelatorio = dadosRel[0].dataRelatorio;
    Adultos = dadosRel[0].adultos;
    Adolecentes = dadosRel[0].adolecentes;
    Crianças = dadosRel[0].criancas;
    Visitantes = dadosRel[0].visitantes;
    sem = dadosRel[0].semana;
    Conversoes = dadosRel[0].conversoes;
    Ofertas = String(formatarMoeda(dadosRel[0].ofertas));
    Dizimos = String(formatarMoeda(dadosRel[0].dizimos));
    ids = dadosRel[0].id;
  }

  //--------------------------------------------------------------------------
  // console.log(ofertas, Ofertas);
  //--------------------------------------------------------------------------
  const valid = () => {
    if (
      !adultos ||
      !adolecentes ||
      !criancas ||
      !visitantes ||
      !conversoes ||
      !ofertas ||
      !dizimos
    ) {
      return false;
    }
    return true;
  };
  //--------------------------------------------------------------------------
  const handleClick = () => {
    setAdultos(Adultos);
    setAdolecentes(Adolecentes);
    setCriancas(Crianças);
    setVisitantes(Visitantes);
    setConversoes(Conversoes);
    setOfertas(String(formatarMoeda(Ofertas)));
    setDizimos(String(formatarMoeda(Dizimos)));
    setDataRelatorio(Data);

    if (!editar) {
      setEditar(true);
      setContador('0');
    } else {
      setEditar(false);
    }
  };
  //--------------------------------------------------------------------------
  const atualizarData = () => {
    setDataRelatorio(Data);
    DataRelatorio = dataRelatorio;
  };
  //--------------------------------------------------------------------------

  const submitData = async (e) => {
    e.preventDefault();
    const valida = valid();
    setLoading(true);
    // const dataRelatorio = DataRelatorio;

    if (valida) {
      try {
        const body = {
          igreja,
          supervisao: item[0].RegiaoIDPB,
          codigoIgreja,
          semana,
          mes,
          ano,
          adultos,
          adolecentes,
          criancas,
          visitantes,
          conversoes,
          dataRelatorio,
          ofertas: String(formatarMoeda(ofertas)),
          dizimos: String(formatarMoeda(dizimos)),
        };

        let urlCreate = '';
        if (dadosRel.length === 0) {
          urlCreate = `${window.location.origin}/api/criarRelatorio`;
        } else {
          urlCreate = `${window.location.origin}/api/updateRelatorio/${ids}`;
        }

        await fetch(urlCreate, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        setLoading(false);
        setEditar(false);
        mutate(url);
      } catch (errors) {
        console.errors();
      }
    }
  };
  return (
    <>
      {session ? (
        <Box
          mt={3}
          className={classes.box}
          width="100%"
          //            maxWidth={1200}
          height="auto"
          borderRadius={16}
        >
          <Hidden smDown>
            <form
              noValidate
              autoComplete="off"
              width="100%"
              className={classes.root}
            >
              <TextField
                id="igreja"
                label="Igreja"
                variant="outlined"
                value={item[0].igreja}
                disabled
                size="small"
                className={classes.tf_12}
              />

              <TextField
                id="codigoIgreja"
                label="Código da Igreja"
                variant="outlined"
                value={item[0].codigoIgreja}
                disabled
                className={classes.tf_4}
                size="small"
              />
              {dadosRel.length !== 0 ? (
                <TextField
                  id="data"
                  label="Data do Relatório"
                  variant="outlined"
                  value={DataRelatorio}
                  disabled
                  className={classes.tf_4}
                  size="small"
                />
              ) : (
                <TextField
                  id="data"
                  label="Data do Relatório"
                  variant="outlined"
                  value={dataRelatorio}
                  disabled
                  className={classes.tf_4}
                  size="small"
                  inputRef={atualizarData}
                />
              )}

              <TextField
                id="Semana"
                label="Semana Nº:"
                variant="outlined"
                value={sem}
                disabled
                className={classes.tf_3}
                size="small"
              />

              <br />
              <br />
              {editar ? (
                <TextField
                  className={classes.tf_6}
                  id="Adultos"
                  label="Membros com + 18"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setAdultos(e.target.value)}
                  error={validarAdultos === 'nao'}
                  onFocus={(e) => setAdultos(e.target.value)}
                  helperText={error ? 'Não pode ser Vazio!' : ''}
                  onBlur={
                    adultos === ''
                      ? () => setValidarAdultos('nao')
                      : (() => setValidarAdultos('sim'), () => setContador('1'))
                  }
                  inputRef={(input) => {
                    if (input != null && contador === '0') {
                      input.focus();
                    }
                  }}
                  value={adultos}
                  variant="outlined"
                  placeholder=""
                  size="small"
                />
              ) : (
                <TextField
                  className={classes.tf_6}
                  id="Adultos"
                  label="Membros com + 18"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={Adultos}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  disabled
                />
              )}
              {editar ? (
                <TextField
                  className={classes.tf_6}
                  id="Adolecentes"
                  label="Membros com + 12"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setAdolecentes(e.target.value)}
                  error={validarAdolecentes === 'nao'}
                  onFocus={(e) => setAdolecentes(e.target.value)}
                  helperText={error ? 'Não pode ser Vazio!' : ''}
                  onBlur={
                    adolecentes === ''
                      ? () => setValidarAdolecentes('nao')
                      : (() => setValidarAdolecentes('sim'),
                        () => setContador('1'))
                  }
                  value={adolecentes}
                  variant="outlined"
                  placeholder=""
                  size="small"
                />
              ) : (
                <TextField
                  className={classes.tf_6}
                  id="Adolecentes"
                  label="Membros com + 12"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={Adolecentes}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  disabled
                />
              )}

              {editar ? (
                <TextField
                  className={classes.tf_6}
                  id="Crianças"
                  label="Membros Crianças"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={criancas}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    criancas === ''
                      ? () => setValidarCriancas('nao')
                      : () => setValidarCriancas('sim')
                  }
                  onChange={(e) => setCriancas(e.target.value)}
                  error={validarCriancas === 'nao'}
                  onFocus={(e) => setCriancas(e.target.value)}
                  helperText={error ? 'Não pode ser Vazio!' : ''}
                />
              ) : (
                <TextField
                  className={classes.tf_6}
                  id="Crianças"
                  label="Membros Crianças"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={Crianças}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  disabled
                />
              )}

              {editar ? (
                <TextField
                  className={classes.tf_6}
                  id="Visitantes"
                  label="Visitantes"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={visitantes}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    visitantes === ''
                      ? () => setValidarVisitantes('nao')
                      : () => setValidarVisitantes('sim')
                  }
                  onChange={(e) => setVisitantes(e.target.value)}
                  error={validarVisitantes === 'nao'}
                  onFocus={(e) => setVisitantes(e.target.value)}
                  helperText={error ? 'Não pode ser Vazio!' : ''}
                />
              ) : (
                <TextField
                  className={classes.tf_6}
                  id="Visitantes"
                  label="Visitantes"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={Visitantes}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  disabled
                />
              )}
              {editar ? (
                <TextField
                  id="conversoes"
                  label="Conversões"
                  value={conversoes}
                  variant="outlined"
                  className={classes.tf_6}
                  size="small"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder=""
                  onBlur={
                    conversoes === ''
                      ? () => setValidarConversoes('nao')
                      : () => setValidarConversoes('sim')
                  }
                  onChange={(e) => setConversoes(e.target.value)}
                  error={validarConversoes === 'nao'}
                  onFocus={(e) => setConversoes(e.target.value)}
                  helperText={error ? 'Não pode ser Vazio!' : ''}
                />
              ) : (
                <TextField
                  id="conversoes"
                  label="Conversões:"
                  variant="outlined"
                  value={Conversoes}
                  disabled
                  className={classes.tf_6}
                  size="small"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder=""
                />
              )}
              {editar ? (
                <TextField
                  id="Ofertas"
                  label="Ofertas:"
                  value={String(formatarMoeda(ofertas))}
                  variant="outlined"
                  className={classes.tf_6}
                  size="small"
                  type="string"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={
                    ofertas === ''
                      ? () => setValidarOfertas('nao')
                      : () => setValidarOfertas('sim')
                  }
                  onChange={(e) => setOfertas(e.target.value)}
                  error={validarOfertas === 'nao'}
                  onFocus={(e) => setOfertas(e.target.value)}
                  helperText={error ? 'Não pode ser Vazio!' : ''}
                  placeholder=""
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
              ) : (
                <TextField
                  id="Ofertas"
                  label="Ofertas:"
                  variant="outlined"
                  value={String(formatarMoeda(Ofertas))}
                  disabled
                  className={classes.tf_6}
                  size="small"
                  type="string"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder=""
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
              )}
              {editar ? (
                <TextField
                  id="Dizimos"
                  label="Dizimos:"
                  value={String(formatarMoeda(dizimos))}
                  variant="outlined"
                  className={classes.tf_6}
                  size="small"
                  type="string"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={
                    ofertas === ''
                      ? () => setValidarDizimos('nao')
                      : () => setValidarDizimos('sim')
                  }
                  onChange={(e) => setDizimos(e.target.value)}
                  error={validarDizimos === 'nao'}
                  onFocus={(e) => setDizimos(e.target.value)}
                  helperText={error ? 'Não pode ser Vazio!' : ''}
                  placeholder=""
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
              ) : (
                <TextField
                  id="Dizimos"
                  label="Dizimos:"
                  variant="outlined"
                  value={String(formatarMoeda(Dizimos))}
                  disabled
                  className={classes.tf_6}
                  size="small"
                  type="string"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder=""
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
              )}
              <br />
              <br />
              {dadosRel.length === 0 ? (
                <Box className={classes.box}>
                  {!editar ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<AddIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Novo
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.buttonCancel}
                      startIcon={<ReplyRoundedIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Voltar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={submitData}
                    mt={3}
                    disabled={!!(!editar || !valid())}
                    //  startIcon={<SaveIcon />}
                  >
                    Salvar
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Box>
              ) : (
                <Box className={classes.box}>
                  {!editar ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<EditIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Editar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.buttonCancel}
                      startIcon={<ReplyRoundedIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Voltar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={submitData}
                    mt={3}
                    disabled={!!(!editar || !valid())}
                    //  startIcon={<SaveIcon />}
                  >
                    Salvar
                  </Button>
                </Box>
              )}
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </form>
          </Hidden>
          <Hidden mdUp>
            <form
              noValidate
              autoComplete="off"
              width="100%"
              className={classes.root}
            >
              <Grid item xs={12}>
                <Box className={classes.novoBox}>
                  <TextField
                    id="igreja"
                    label="Igreja"
                    variant="outlined"
                    value={item[0].igreja}
                    disabled
                    size="small"
                    className={classes.tf_m}
                  />
                </Box>
              </Grid>
              <Box flexDirection="row" display={{ xs: 'none', sm: 'block' }}>
                <Grid item xs={12}>
                  <Box className={classes.novoBox}>
                    <TextField
                      id="codigoIgreja"
                      label="Código"
                      variant="outlined"
                      value={item[0].codigoIgreja}
                      disabled
                      className={classes.tf_m}
                      size="small"
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row">
                <Grid item xs={6}>
                  <Box className={classes.novoBox}>
                    {dadosRel.length !== 0 ? (
                      <TextField
                        id="data"
                        label="Data"
                        variant="outlined"
                        value={DataRelatorio}
                        disabled
                        className={classes.tf_m}
                        size="small"
                      />
                    ) : (
                      <TextField
                        id="data"
                        label="Data"
                        variant="outlined"
                        value={dataRelatorio}
                        disabled
                        className={classes.tf_m}
                        size="small"
                        inputRef={atualizarData}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className={classes.novoBox}>
                    <TextField
                      id="Semana"
                      label="Semana Nº:"
                      variant="outlined"
                      value={sem}
                      disabled
                      className={classes.tf_m}
                      size="small"
                    />
                  </Box>
                </Grid>
              </Box>

              <br />
              <Box display="flex" flexDirection="row">
                <Grid item xs={4}>
                  <Box className={classes.novoBox}>
                    {editar ? (
                      <TextField
                        className={classes.tf_m}
                        id="Adultos"
                        label="+ 18"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={adultos}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          adultos === ''
                            ? () => setValidarAdultos('nao')
                            : (() => setValidarAdultos('sim'),
                              () => setContador('1'))
                        }
                        onChange={(e) => setAdultos(e.target.value)}
                        error={validarAdultos === 'nao'}
                        onFocus={(e) => setAdultos(e.target.value)}
                        helperText={error ? 'Não pode ser Vazio!' : ''}
                        inputRef={(input) => {
                          if (input != null && contador === '0') {
                            input.focus();
                          }
                        }}
                      />
                    ) : (
                      <TextField
                        className={classes.tf_m}
                        id="Adultos"
                        label="+ 18"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={Adultos}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        disabled
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={classes.novoBox}>
                    {editar ? (
                      <TextField
                        className={classes.tf_m}
                        id="Adolecentes"
                        label="+ 12"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={adolecentes}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          adolecentes === ''
                            ? () => setValidarAdolecentes('nao')
                            : (() => setValidarAdolecentes('sim'),
                              () => setContador('1'))
                        }
                        onChange={(e) => setAdolecentes(e.target.value)}
                        error={validarAdolecentes === 'nao'}
                        onFocus={(e) => setAdolecentes(e.target.value)}
                        helperText={error ? 'Não pode ser Vazio!' : ''}
                      />
                    ) : (
                      <TextField
                        className={classes.tf_m}
                        id="Adolecentes"
                        label="+ 12"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={Adolecentes}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        disabled
                      />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box className={classes.novoBox}>
                    {editar ? (
                      <TextField
                        className={classes.tf_m}
                        id="Crianças"
                        label="Crianças"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={criancas}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          criancas === ''
                            ? () => setValidarCriancas('nao')
                            : () => setValidarCriancas('sim')
                        }
                        onChange={(e) => setCriancas(e.target.value)}
                        error={validarCriancas === 'nao'}
                        onFocus={(e) => setCriancas(e.target.value)}
                        helperText={error ? 'Não pode ser Vazio!' : ''}
                      />
                    ) : (
                      <TextField
                        className={classes.tf_m}
                        id="Crianças"
                        label="Crianças"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={Crianças}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        disabled
                      />
                    )}
                  </Box>
                </Grid>
              </Box>

              <Box display="flex" flexDirection="row">
                <Grid item xs={6}>
                  <Box className={classes.novoBox}>
                    {editar ? (
                      <TextField
                        className={classes.tf_m}
                        id="Visitantes"
                        label="Visitantes"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={visitantes}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          visitantes === ''
                            ? () => setValidarVisitantes('nao')
                            : () => setValidarVisitantes('sim')
                        }
                        onChange={(e) => setVisitantes(e.target.value)}
                        error={validarVisitantes === 'nao'}
                        onFocus={(e) => setVisitantes(e.target.value)}
                        helperText={error ? 'Não pode ser Vazio!' : ''}
                      />
                    ) : (
                      <TextField
                        className={classes.tf_m}
                        id="Visitantes"
                        label="Visitantes"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={Visitantes}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        disabled
                      />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box className={classes.novoBox}>
                    {editar ? (
                      <TextField
                        id="conversoes"
                        label="Conversões"
                        value={conversoes}
                        variant="outlined"
                        className={classes.tf_m}
                        size="small"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder=""
                        onBlur={
                          conversoes === ''
                            ? () => setValidarConversoes('nao')
                            : () => setValidarConversoes('sim')
                        }
                        onChange={(e) => setConversoes(e.target.value)}
                        error={validarConversoes === 'nao'}
                        onFocus={(e) => setConversoes(e.target.value)}
                        helperText={error ? 'Não pode ser Vazio!' : ''}
                      />
                    ) : (
                      <TextField
                        id="conversoes"
                        label="Conversões:"
                        variant="outlined"
                        value={Conversoes}
                        disabled
                        className={classes.tf_m}
                        size="small"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder=""
                      />
                    )}
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row">
                <Grid item xs={6}>
                  <Box className={classes.novoBox}>
                    {editar ? (
                      <TextField
                        id="Ofertas"
                        label="Ofertas:"
                        value={String(formatarMoeda(ofertas))}
                        variant="outlined"
                        className={classes.tf_m}
                        size="small"
                        type="string"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onBlur={
                          ofertas === ''
                            ? () => setValidarOfertas('nao')
                            : () => setValidarOfertas('sim')
                        }
                        onChange={(e) => setOfertas(e.target.value)}
                        error={validarOfertas === 'nao'}
                        onFocus={(e) => setOfertas(e.target.value)}
                        helperText={error ? 'Não pode ser Vazio!' : ''}
                        placeholder=""
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">R$</InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      <TextField
                        id="Ofertas"
                        label="Ofertas:"
                        variant="outlined"
                        value={String(formatarMoeda(Ofertas))}
                        disabled
                        className={classes.tf_m}
                        size="small"
                        type="string"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder=""
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">R$</InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className={classes.novoBox}>
                    {editar ? (
                      <TextField
                        id="Dizimos"
                        label="Dizimos:"
                        value={String(formatarMoeda(dizimos))}
                        variant="outlined"
                        className={classes.tf_m}
                        size="small"
                        type="string"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onBlur={
                          dizimos === ''
                            ? () => setValidarDizimos('nao')
                            : () => setValidarDizimos('sim')
                        }
                        onChange={(e) => setDizimos(e.target.value)}
                        error={validarDizimos === 'nao'}
                        onFocus={(e) => setDizimos(e.target.value)}
                        helperText={error ? 'Não pode ser Vazio!' : ''}
                        placeholder=""
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">R$</InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      <TextField
                        id="Dizimos"
                        label="Dizimos:"
                        variant="outlined"
                        value={String(formatarMoeda(Dizimos))}
                        disabled
                        className={classes.tf_m}
                        size="small"
                        type="string"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder=""
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">R$</InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </Box>

              {dadosRel.length === 0 ? (
                <Box className={classes.box}>
                  {!editar ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<AddIcon />}
                      onClick={handleClick}
                      mt={2}
                      //  startIcon={<SaveIcon />}
                    >
                      Novo
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.buttonCancel}
                      startIcon={<ReplyRoundedIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Voltar
                    </Button>
                  )}
                  {!editar || !valid() ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      onClick={submitData}
                      mt={3}
                      disabled
                      //  startIcon={<SaveIcon />}
                    >
                      Salvar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      onClick={submitData}
                      mt={3}

                      //  startIcon={<SaveIcon />}
                    >
                      Salvar
                    </Button>
                  )}
                </Box>
              ) : (
                <Box className={classes.box}>
                  {!editar ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<EditIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Editar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.buttonCancel}
                      startIcon={<ReplyRoundedIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Voltar
                    </Button>
                  )}
                  {!editar || !valid() ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      onClick={submitData}
                      mt={3}
                      disabled
                      //  startIcon={<SaveIcon />}
                    >
                      Salvar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      onClick={submitData}
                      mt={3}

                      //  startIcon={<SaveIcon />}
                    >
                      Salvar
                    </Button>
                  )}
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Box>
              )}
            </form>
          </Hidden>
        </Box>
      ) : (
        signOut({
          callbackUrl: `${window.location.origin}`,
        })
      )}
    </>
  );
}

export default formulario;

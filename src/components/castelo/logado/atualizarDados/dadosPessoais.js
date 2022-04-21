import { makeStyles } from '@material-ui/core/styles';
// import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { Oval } from 'react-loading-icons';
import { Box, Button, capitalize } from '@mui/material';
import React from 'react';
import Select from 'react-select';
// import Image from 'next/image';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import api from 'src/components/services/api';
import cpfMask from 'src/components/mascaras/cpf';
import dataMask from 'src/components/mascaras/datas';
import foneMask from 'src/components/mascaras/fone';
import celularMask from 'src/components/mascaras/celular';
import MenuItem from '@material-ui/core/MenuItem';
import 'react-image-crop/dist/ReactCrop.css';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { ToastContainer, toast } from 'react-toastify';
import corIgreja from 'src/utils/coresIgreja';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
  },
  boxImg: {
    flexGrow: 1,
    padding: 0.3,
    marginTop: 3,
    marginBottom: -4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
  },
  alignBox: {
    padding: theme.spacing(0),
    // display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    // height: '330px',
    marginTop: 20,
  },
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: 'auto',
  },
  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
  logo: {
    height: '100%',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      marginLeft: 2,
    },
  },
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'blue',
  },
  caption: {
    marginTop: -5,
    marginLeft: 5,
    textTransform: 'capitalize',
    fontWeight: 1000,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '40px',
    '@media (min-width:600px)': {
      fontSize: '20px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  typography: {
    color: 'black',
    fontWeight: 1000,
    marginTop: -10,
    marginLeft: 5,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '30px',
    '@media (min-width:600px)': {
      fontSize: '20px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  rotulo: {
    color: 'blue',
    textTransform: 'capitalize',
    fontWeight: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '30px',
    '@media (min-width:600px)': {
      fontSize: '16px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  tf_12: {
    // marginLeft: theme.spacing(1),
    //  marginRight: theme.spacing(1),
    width: '500px',
    backgroundColor: '#ffff',

    margin: 10,
    [theme.breakpoints.down('md')]: {
      width: '20',
    },
  },
  tf_m: {
    backgroundColor: '#ffff',

    width: '100%',
    fontSize: '5px',
  },

  tf_6: {
    //    marginRight: 8,
    backgroundColor: '#f0f4c3',

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
    backgroundColor: '#f0f4c3',
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
    backgroundColor: '#f0f4c3',
    // marginRight: 8,
    width: '120px',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '110px',
    },
  },
  root: {
    // position: 'absolute',
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
  },
}));

const currencies = [
  {
    value: 'SOLTEIRO (A)',
    label: 'SOLTEIRO (A)',
  },
  {
    value: 'CASADO (A)',
    label: 'CASADO (A)',
  },
  {
    value: 'VIÚVO (A)',
    label: 'VIÚVO (A)',
  },
  {
    value: 'DIVORCIADO (A)',
    label: 'DIVORCIADO (A)',
  },
];
const sexos = [
  {
    value: 'MASCULINO',
    label: 'MASCULINO',
  },
  {
    value: 'FEMININO',
    label: 'FEMININO',
  },
];
function DadosPessoais({ rolMembros, perfilUser }) {
  const classes = useStyles();
  const dadosUser = rolMembros.filter(
    (val) => val.RolMembro === Number(perfilUser.RolMembro),
  );
  const valorInicialSexo = {
    label: dadosUser[0].Sexo,
    value: dadosUser[0].Sexo,
  };
  const [nome, setNome] = React.useState(dadosUser[0].Nome);
  const [validarNome, setValidarNome] = React.useState('sim');
  const [cpf, setCPF] = React.useState(dadosUser[0].CPF);
  const [validarCPF, setValidarCPF] = React.useState('sim');
  const [rg, setRG] = React.useState(dadosUser[0].RG);
  const [validarRG, setValidarRG] = React.useState('sim');
  const [sexo, setSexo] = React.useState(valorInicialSexo);
  const [validarSexo, setValidarSexo] = React.useState('sim');
  const [fone, setFone] = React.useState(dadosUser[0].TelFixo);
  const [validarFone, setValidarFone] = React.useState('sim');
  const [celular, setCelular] = React.useState(dadosUser[0].TelCelular);
  const [validarCelular, setValidarCelular] = React.useState('sim');
  const [estadoCivil, setEstadoCivil] = React.useState('');
  const [dataNascimento, setDataNascimento] = React.useState(
    dadosUser[0].Nascimento,
  );
  const [validarDataNascimento, setValidarDataNascimento] =
    React.useState('sim');
  const [naturalidade, setNaturalidade] = React.useState(
    dadosUser[0].Naturalidade,
  );
  const [validarNaturalidade, setValidarNaturalidade] = React.useState('sim');
  const [loading, setLoading] = React.useState(false);

  const nomeRef = React.useRef();
  const celularRef = React.useRef();
  const foneRef = React.useRef();
  const cpfRef = React.useRef();
  const rgRef = React.useRef();
  const sexoRef = React.useRef();
  const nascimentoRef = React.useRef();
  const naturalidadeRef = React.useRef();
  const estadoCivilRef = React.useRef();

  const eCivilInical = {
    value: 'indefinido',
    label: '',
  };

  const [values, setValues] = React.useState({
    currency: eCivilInical,
  });

  const url = `/api/consultaRolMembros/${dadosUser[0].id}`;
  const { data, error } = useSWR(url, fetcher);
  React.useEffect(() => {
    if (data) {
      setNome(data[0].Nome);
      setCelular(data[0].TelCelular);
      setFone(data[0].TelFixo);
      setCPF(data[0].CPF);
      setRG(data[0].RG);
      setSexo(data[0].Sexo);
      setDataNascimento(data[0].Nascimento);
      setNaturalidade(data[0].Naturalidade);
      setValues({
        currency: {
          value: data[0].EstadoCivil,
          label: data[0].EstadoCivil,
        },
      });
    }

    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);
  console.log('qual o valor', values);
  //--------------------------------------------------------------------------
  // salvar dados pessoais
  //--------------------------------------------------------------------------
  const handleSalvar = () => {
    setLoading(true);

    api
      .post('/api/atualizarRolMembros', {
        id: dadosUser[0].id,
        Nome: nome,
        TelCelular: celular,
        TelFixo: fone,
        CPF: cpf,
        RG: rg,
        Sexo: sexo.label,
        Nascimento: dataNascimento,
        Naturalidade: naturalidade,
        EstadoCivil: estadoCivil.label,
      })
      .then((response) => {
        if (response) {
          setLoading(false);
          toast.info('Dados Atualizados !', {
            position: toast.POSITION.TOP_CENTER,
          });
          mutate(url);
        }
      })
      .catch(() => {
        toast.error('Erro ao Atualizar Dados!', {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      });
  };
  //--------------------------------------------------------------------------

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });

    setEstadoCivil(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formId = event.target.id;

      if (formId === 'Nome') celularRef.current.focus();
      if (formId === 'TelefoneCelular') foneRef.current.focus();
      if (formId === 'TelefoneResidencial') cpfRef.current.focus();
      if (formId === 'CPF') rgRef.current.focus();
      if (formId === 'RG') sexoRef.current.focus();
      if (formId === 'Sexo') nascimentoRef.current.focus();
      if (formId === 'DataNascimento') naturalidadeRef.current.focus();
      if (formId === 'Naturalidade') estadoCivilRef.current.focus();
    }
  };

  //= ===================================================================

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width="100vw"
      height="90vh"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={1}
        width="96%"
        height="90vh"
        bgcolor={corIgreja.principal}
      >
        <Box width="96%">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Nome
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  inputRef={nomeRef}
                  className={classes.tf_m}
                  id="Nome"
                  type="text"
                  InputLabelProps={{
                    style: { textTransform: 'uppercase' },
                    shrink: true,
                  }}
                  value={nome}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    nome === ''
                      ? () => setValidarNome('nao')
                      : () => setValidarNome('sim')
                  }
                  onChange={(e) => setNome(capitalize(e.target.value))}
                  error={validarNome === 'nao'}
                  onFocus={(e) => setNome(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Celular
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="TelefoneCelular"
                  type="text"
                  inputRef={celularRef}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={celularMask(celular).replace(/[\][)]/g, ') ')}
                  variant="outlined"
                  placeholder="(99) 9999-9999"
                  size="small"
                  onBlur={
                    celular === ''
                      ? () => setValidarCelular('nao')
                      : () => setValidarCelular('sim')
                  }
                  onChange={(e) => setCelular(e.target.value)}
                  error={validarCelular === 'nao'}
                  onFocus={(e) => setCelular(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Residencial
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="TelefoneResidencial"
                  type="text"
                  inputRef={foneRef}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={foneMask(fone).replace(/[\][)]/g, ') ')}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    fone === ''
                      ? () => setValidarFone('nao')
                      : () => setValidarFone('sim')
                  }
                  onChange={(e) => setFone(e.target.value)}
                  error={validarFone === 'nao'}
                  onFocus={(e) => setFone(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  CPF
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="CPF"
                  // // // label="CPF"
                  type="text"
                  inputRef={cpfRef}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={cpfMask(cpf)}
                  variant="outlined"
                  placeholder="999.999.999-99"
                  size="small"
                  onBlur={
                    cpf === ''
                      ? () => setValidarCPF('nao')
                      : () => setValidarCPF('sim')
                  }
                  onChange={(e) => setCPF(e.target.value)}
                  error={validarCPF === 'nao'}
                  onFocus={(e) => setCPF(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  IDENTIDADE (RG)
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="RG"
                  inputRef={rgRef}
                  // label="RG"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={rg}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    rg === ''
                      ? () => setValidarRG('nao')
                      : () => setValidarRG('sim')
                  }
                  onChange={(e) => setRG(e.target.value)}
                  error={validarRG === 'nao'}
                  onFocus={(e) => setRG(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  SEXO
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <Select
                  defaultValue={sexo}
                  onChange={(e) => {
                    setSexo(e);
                  }}
                  options={sexos}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  DATA NASCIMENTO
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="DataNascimento"
                  // label="Data de Nascimento"
                  type="text"
                  inputRef={nascimentoRef}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={dataMask(dataNascimento)}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    dataNascimento === ''
                      ? () => setValidarDataNascimento('nao')
                      : () => setValidarDataNascimento('sim')
                  }
                  onChange={(e) => setDataNascimento(e.target.value)}
                  error={validarDataNascimento === 'nao'}
                  onFocus={(e) => setDataNascimento(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  NATURAL DE
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="Naturalidade"
                  inputRef={naturalidadeRef}
                  // label="Naturalidade"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={naturalidade}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  onBlur={
                    naturalidade === ''
                      ? () => setValidarNaturalidade('nao')
                      : () => setValidarNaturalidade('sim')
                  }
                  onChange={(e) => setNaturalidade(e.target.value)}
                  error={validarNaturalidade === 'nao'}
                  onFocus={(e) => setNaturalidade(e.target.value)}
                  onKeyDown={handleEnter}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  ESTADO CIVIL
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2}>
                <TextField
                  className={classes.tf_m}
                  id="EstadoCivil"
                  inputRef={estadoCivilRef}
                  select
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={values.currency}
                  onChange={handleChange('currency')}
                  variant="outlined"
                  placeholder=""
                  size="small"
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                    renderValue: (option) => option.label,
                  }}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option}>
                      ({option.value})
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box className={classes.novoBox} mt={2}>
                {!loading ? (
                  <Button
                    style={{ background: 'green' }}
                    onClick={handleSalvar}
                    variant="contained"
                    severity="success"
                    endIcon={<TouchAppIcon />}
                  >
                    SALVAR DADOS
                  </Button>
                ) : (
                  <Button
                    style={{ background: 'green' }}
                    onClick={handleSalvar}
                    variant="contained"
                    severity="success"
                    endIcon={<Oval stroke="red" width={20} height={20} />}
                  >
                    SALVANDO...
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}

export default DadosPessoais;

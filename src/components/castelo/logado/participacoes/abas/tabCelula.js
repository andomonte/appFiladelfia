import * as React from 'react';
import { Box } from '@material-ui/core';
import PegaSemana from 'src/utils/getSemana';

import useSWR from 'swr';
import axios from 'axios';
import { BsFillEmojiSmileFill, BsFillEmojiFrownFill } from 'react-icons/bs';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({ Mes, Ano, perfilUser }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [presSem1, setPresSem1] = React.useState([]);
  const [presSem2, setPresSem2] = React.useState([]);
  const [presSem3, setPresSem3] = React.useState([]);
  const [presSem4, setPresSem4] = React.useState([]);
  const [presSem5, setPresSem5] = React.useState([]);
  const semana = PegaSemana(Mes, Ano);
  // para usar semanas

  const semana1 = semana;
  const rol = perfilUser.RolMembro;

  const url = `/api/consultaPresCelula/${rol}`;

  const { data, error } = useSWR(url, fetcher);
  React.useEffect(() => {
    if (data) {
      //      const dadosMesa = data.filter((val) => val.codigo === Number(codigo));
      const dadosPresenca1 = data.filter(
        (val) => val.Semana === Number(semana1),
      );
      setPresSem1(dadosPresenca1);

      const dadosPresenca2 = data.filter(
        (val) => val.Semana === Number(semana1) + 1,
      );
      setPresSem2(dadosPresenca2);

      const dadosPresenca3 = data.filter(
        (val) => val.Semana === Number(semana1) + 2,
      );
      setPresSem3(dadosPresenca3);

      const dadosPresenca4 = data.filter(
        (val) => val.Semana === Number(semana1) + 3,
      );
      setPresSem4(dadosPresenca4);

      const dadosPresenca5 = data.filter(
        (val) => val.Semana === Number(semana1) + 4,
      );
      setPresSem5(dadosPresenca5);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);

  return (
    <Box height="100%">
      <Box
        bgcolor="#80cbc4"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '2px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="16.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="33%"
        >
          SEMANA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="34%"
          sx={{
            borderLeft: '2px solid #000',
            borderRight: '2px solid #000',
          }}
        >
          DATA
        </Box>
        <Box textAlign="center" width="33%">
          STATUS
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '2px solid #000',
        }}
        height="16.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="33%"
        >
          1
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="34%"
          sx={{
            borderLeft: '2px solid #000',
            borderRight: '2px solid #000',
          }}
        >
          {presSem1.length ? presSem1[0].Data : '-'}
        </Box>
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="33%"
        >
          {presSem1.length ? (
            <Box mt={1}>
              {presSem1[0].ReuniaoCelula === 'SIM' ? (
                <BsFillEmojiSmileFill size={25} color="green" />
              ) : (
                <BsFillEmojiFrownFill size={25} color="red" />
              )}
            </Box>
          ) : (
            '-'
          )}
        </Box>
      </Box>
      <Box
        bgcolor="#eeeeee"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '2px solid #000',
        }}
        height="16.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="33%"
        >
          2
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="34%"
          sx={{
            borderLeft: '2px solid #000',
            borderRight: '2px solid #000',
          }}
        >
          {presSem2.length ? presSem2[0].Data : '-'}
        </Box>
        <Box textAlign="center" width="33%">
          {presSem2.length ? (
            <Box>
              {presSem2[0].ReuniaoCelula === 'SIM' ? (
                <BsFillEmojiSmileFill size={25} color="green" />
              ) : (
                <BsFillEmojiFrownFill size={25} color="red" />
              )}
            </Box>
          ) : (
            '-'
          )}
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '2px solid #000',
        }}
        height="16.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="33%"
        >
          3
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="34%"
          sx={{
            borderLeft: '2px solid #000',
            borderRight: '2px solid #000',
          }}
        >
          {presSem3.length ? presSem3[0].Data : '-'}
        </Box>
        <Box textAlign="center" width="33%">
          {presSem3.length ? (
            <Box>
              {presSem3[0].ReuniaoCelula === 'SIM' ? (
                <BsFillEmojiSmileFill size={25} color="green" />
              ) : (
                <BsFillEmojiFrownFill size={25} color="red" />
              )}
            </Box>
          ) : (
            '-'
          )}
        </Box>
      </Box>
      <Box
        bgcolor="#eeeeee"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '2px solid #000',
        }}
        height="16.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="33%"
        >
          4
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="34%"
          sx={{
            borderLeft: '2px solid #000',
            borderRight: '2px solid #000',
          }}
        >
          {presSem4.length ? presSem4[0].Data : '-'}
        </Box>
        <Box textAlign="center" width="33%">
          {presSem4.length ? (
            <Box>
              {presSem4[0].ReuniaoCelula === 'SIM' ? (
                <BsFillEmojiSmileFill size={25} color="green" />
              ) : (
                <BsFillEmojiFrownFill size={25} color="red" />
              )}
            </Box>
          ) : (
            '-'
          )}
        </Box>
      </Box>

      <Box
        sx={{
          fontFamily: 'arial black',
        }}
        height="16.66%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="33%"
        >
          5
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="34%"
          sx={{
            borderLeft: '2px solid #000',
            borderRight: '2px solid #000',
          }}
        >
          {presSem5.length ? presSem5[0].Data : '-'}
        </Box>
        <Box textAlign="center" width="33%">
          {presSem5.length ? (
            <Box>
              {presSem5[0].ReuniaoCelula === 'SIM' ? (
                <BsFillEmojiSmileFill size={25} color="green" />
              ) : (
                <BsFillEmojiFrownFill size={25} color="red" />
              )}
            </Box>
          ) : (
            '-'
          )}
        </Box>
      </Box>
    </Box>
  );
}
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import axios from "axios";

export const getUserFavorites = async () => {
  const userFavoritesParkings = store.getState().user.value.favorisPark;

  let paris =
    "https://data.opendatasoft.com/api/records/1.0/search/?dataset=places-disponibles-parkings-saemes@saemes";
  let orleans =
    "https://data.opendatasoft.com/api/records/1.0/search/?dataset=mobilite-places-disponibles-parkings-en-temps-reel@orleansmetropole&rows=20";
  const parisData = await axios.get(paris);
  const orleansData = await axios.get(orleans);
  let parkingsData = [];
  let favoriteOfUser = [];
  return axios
    .all([parisData, orleansData])
    .then(
      axios.spread((...responses) => {
        const responseParis = responses[0];
        const responseOrleans = responses[1];

        parkingsData = [
          ...responseParis.data.records,
          ...responseOrleans.data.records,
        ].forEach((el) => {
          if (
            userFavoritesParkings.includes(el.fields.id) ||
            userFavoritesParkings.includes(el.recordid)
          ) {
            favoriteOfUser.push({
              id: el.datasetid.includes("orleansmetropole")
                ? el.fields.id
                : el.recordid,
              freeplaces:
                el.fields.counterfreeplaces >= 0
                  ? el.fields.counterfreeplaces
                  : el.fields.dispo,
              name: el.fields.nom_parking || el.fields.name,
              latitude: el.geometry.coordinates[1],
              longitude: el.geometry.coordinates[0],
              pinStyle: {
                tintColor:
                  el?.fields.counterfreeplaces > 40 || el?.fields.dispo > 40
                    ? "green"
                    : el?.fields.counterfreeplaces > 0 || el?.fields.dispo > 0
                    ? "orange"
                    : "red",
              },
              schedule:
                el.fields
                  .horaires_d_acces_au_public_pour_les_usagers_non_abonnes,
            });
          }
        });

        return [...favoriteOfUser];
      })
    )
    .catch((err) => console.error(err));
};

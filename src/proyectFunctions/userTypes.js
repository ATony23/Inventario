module.exports = usu = {
    esDeVentas(id_user_type) {
        if (id_user_type == 4 ||
            id_user_type == 7 ||
            id_user_type == 8 ||
            id_user_type == 9 ||
            id_user_type == 10 ||
            id_user_type == 11 ||
            id_user_type == 12 ||
            id_user_type == 13 ||
            id_user_type == 14 ||
            id_user_type == 15)
            return true;
        else
            return false;
    },
    esDeDocumentos(id_user_type) {
        if (id_user_type == 2 ||
            id_user_type == 5)
            return true;
        else
            return false;
    },
    esDePagos(id_user_type) {
        if (id_user_type == 3 ||
            id_user_type == 6 ||
            id_user_type == 16)
            return true;
        else
            return false;
    },
    esJerarquia(id_type_superior, id_type_subordinado) {
        const MVP = 1
        const masterDocumentos = 2
        const masterPagos = 3
        const gerenteComercial = 4
        const documentos = 5
        const pagos = 6
        const gerenteVentas = 7
        const subgerente = 8
        const consultor = 9
        const gerenteOperaciones = 10
        const asistenteSubgerente = 11
        const asistenteGerenteVentas = 12
        const asistenteGerenteOperaciones = 13
        const gerenteEjecutivo = 14
        const marketing = 15

        if (id_type_superior == MVP &&
            ((id_type_subordinado == gerenteOperaciones) || (id_type_subordinado == gerenteComercial) || (id_type_subordinado == masterDocumentos) || (id_type_subordinado == masterPagos) || (id_type_subordinado == gerenteEjecutivo)) ||
            (id_type_superior == masterDocumentos && id_type_subordinado == documentos) ||
            (id_type_superior == masterPagos && id_type_subordinado == pagos) ||
            (id_type_superior == gerenteComercial && id_type_subordinado == gerenteOperaciones) ||
            (id_type_superior == gerenteComercial && id_type_subordinado == gerenteEjecutivo) ||
            (id_type_superior == gerenteOperaciones && id_type_subordinado == gerenteVentas) ||
            (id_type_superior == gerenteVentas && id_type_subordinado == subgerente) ||
            (id_type_superior == gerenteVentas && id_type_subordinado == consultor) ||
            (id_type_superior == subgerente && id_type_subordinado == consultor) ||
            (id_type_superior == gerenteVentas && id_type_subordinado == asistenteGerenteVentas) ||
            (id_type_superior == subgerente && id_type_subordinado == asistenteSubgerente) ||
            (id_type_superior == gerenteOperaciones && id_type_subordinado == asistenteGerenteOperaciones) ||
            (id_type_superior == gerenteComercial && id_type_subordinado == marketing) ||
            (id_type_superior == gerenteOperaciones && id_type_subordinado == consultor))

            return true;
        else
            return false;
    },
    esMVP(id_user_type) {
        if (id_user_type == 1)
            return true;
        else
            return false;
    },
    esGSA(id_user_type) {
        if (id_user_type == 7 ||
            id_user_type == 8 ||
            id_user_type == 9)
            return true;
        else
            return false;
    },
    esMaster(id_user_type) {
        if (id_user_type == 2 ||
            id_user_type == 3 ||
            id_user_type == 4)
            return true;
        else
            return false;
    },
    esAsistente(id_user_type) {
        if (id_user_type == 11 ||
            id_user_type == 12 ||
            id_user_type == 13)
            return true;
        else
            return false;
    }
}


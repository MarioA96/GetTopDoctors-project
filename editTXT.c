#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char* argv[]){

    printf("%d\n", argc);

    if(argc != 2){
        printf("ERROR: El numero de entradas no coincide...\n");
        printf("[programa] <int>[indice de archivo]\n");
        exit(0);
    };

  const char *listEspe[116];
  listEspe[0] = "anestesiologia";
  listEspe[1] = "anestesiologia_pediatrica";
  listEspe[2] = "anestesiologia_para_los_servicios_rurales_de_la_salud";
  listEspe[3] = "algologia";
  listEspe[4] = "cuidados_paliativos";
  listEspe[5] = "neuroanestesiologia";
  listEspe[6] = "angiologia,_cirugia_vascular_y_endovascular";
  listEspe[7] = "anatomia_patologica";
  listEspe[8] = "neuropatologia";
  listEspe[9] = "patologia_pediatrica";
  listEspe[10] = "comunicacion_audiologia,_otoneurologia_y_foniatria";
  listEspe[11] = "cardiologia_clinica";
  listEspe[12] = "cardiologia_pediatrica";
  listEspe[13] = "cardiologia_intervencionista";
  listEspe[14] = "cardiologia_intervencionista_en_cardiopatias_congenitas";
  listEspe[15] = "ecocardiografia_adultos";
  listEspe[16] = "ecocardiografia_pediatrica";
  listEspe[17] = "electrofisiologia";
  listEspe[18] = "rehabilitacion_cardiaca_y_prevencion_secundaria";
  listEspe[19] = "cirugia_general";
  listEspe[20] = "cirugia_bariatrica";
  listEspe[21] = "cirugia_para_los_servicios_rurales_de_la_salud";
  listEspe[22] = "cirugia_de_trasplantes";
  listEspe[23] = "cirugia_oral_maxilofacial";
  listEspe[24] = "cirugia_neurologica";
  listEspe[25] = "neurocirugia_pediatrica";
  listEspe[26] = "terapia_endovascular_neurologica";
  listEspe[27] = "cirugia_pediatrica";
  listEspe[28] = "cirugia_plastica,_estetica_y_reconstructiva";
  listEspe[29] = "cirugia_cardiaca_en_adultos";
  listEspe[30] = "cirugia_cardiaca_en_pediatria";
  listEspe[31] = "cirugia_cardiotoracica";
  listEspe[32] = "cirugia_toracica_no_cardiaca";
  listEspe[33] = "cirugia_de_torax_pediatrica_no_cardiaca";
  listEspe[34] = "dermatologia";
  listEspe[35] = "dermatologia_pediatrica";
  listEspe[36] = "endocrinologia";
  listEspe[37] = "endocrinologia_pediatrica";
  listEspe[38] = "coloproctologia";
  listEspe[39] = "gastroenterologia";
  listEspe[40] = "gastroenterologia_pediatrica";
  listEspe[41] = "endoscopia_del_aparato_digestivo";
  listEspe[42] = "cirugia_del_aparato_digestivo";
  listEspe[43] = "genetica_medica";
  listEspe[44] = "genetica_molecular";
  listEspe[45] = "citogenetica";
  listEspe[46] = "geriatria";
  listEspe[47] = "ginecologia_y_obstetricia";
  listEspe[48] = "biologia_de_la_reproduccion_humana";
  listEspe[49] = "medicina_materno_fetal";
  listEspe[50] = "urologia_ginecologica";
  listEspe[51] = "hematologia";
  listEspe[52] = "hematologia_pediatrica";
  listEspe[53] = "infectologia_adultos";
  listEspe[54] = "infectologia_pediatrica";
  listEspe[55] = "inmunologia_clinica_y_alergia";
  listEspe[56] = "medicina_aeroespacial";
  listEspe[57] = "medicina_critica";
  listEspe[58] = "medicina_critica_en_obstetricia";
  listEspe[59] = "medicina_del_deporte";
  listEspe[60] = "medicina_familiar";
  listEspe[61] = "medicina_del_nino_y_del_adulto_para_los_servicios_rurales_de_salud";
  listEspe[62] = "medicina_integrada";
  listEspe[63] = "medicina_interna";
  listEspe[64] = "medicina_legal_y_forense";
  listEspe[65] = "medicina_de_rehabilitacion";
  listEspe[66] = "rehabilitacion_cardiaca";
  listEspe[67] = "medicina_del_trabajo";
  listEspe[68] = "medicina_del_trabajo_y_ambiental";
  listEspe[69] = "medicina_de_urgencias";
  listEspe[70] = "urgencias_pediatricas";
  listEspe[71] = "medicina_nuclear";
  listEspe[72] = "medicina_nuclear_cardiologica";
  listEspe[73] = "medicina_nuclear_oncologica,_molecular_y_terapeutica";
  listEspe[74] = "nefrologia";
  listEspe[75] = "nefrologia_pediatrica";
  listEspe[76] = "neumologia";
  listEspe[77] = "neumologia_pediatrica";
  listEspe[78] = "medicina_del_sueno";
  listEspe[79] = "broncoscopia_intervencionista";
  listEspe[80] = "broncoscopia_intervencionista_pediatrica";
  listEspe[81] = "fisiologia_respiratoria";
  listEspe[82] = "endoscopia_toracica";
  listEspe[83] = "neurofisiologia_clinica";
  listEspe[84] = "oftalmologia";
  listEspe[85] = "oncologia_medica";
  listEspe[86] = "oncologia_pediatrica";
  listEspe[87] = "cirugia_oncologica";
  listEspe[88] = "cirugia_oncologica_pediatrica";
  listEspe[89] = "ginecologia_oncologica";
  listEspe[90] = "ortopedia_y_traumatologia";
  listEspe[91] = "otorrinolaringologia_y_cirugia_de_cabeza_y_cuello";
  listEspe[92] = "otorrinolaringologia_pediatrica";
  listEspe[93] = "neuro-otologia";
  listEspe[94] = "patologia_clinica";
  listEspe[95] = "pediatria";
  listEspe[96] = "neonatologia";
  listEspe[97] = "medicina_del_enfermo_pediatrico_en_estado_critico";
  listEspe[98] = "psiquiatria";
  listEspe[99] = "psiquiatria_infantil_y_de_la_adolescencia";
  listEspe[100] = "radiologia_e_imagen";
  listEspe[101] = "radiologia_pediatrica";
  listEspe[102] = "radiologia_vascular_e_intervencionista";
  listEspe[103] = "imagen_de_la_mama";
  listEspe[104] = "neurorradiologia";
  listEspe[105] = "imagen_del_sistema_musculoesqueletico";
  listEspe[106] = "terapia_endovascular_neurologica";
  listEspe[107] = "radio_oncologia";
  listEspe[108] = "reumatologia";
  listEspe[109] = "reumatologia_pediatrica";
  listEspe[110] = "salud_publica";
  listEspe[111] = "epidemiologia";
  listEspe[112] = "medicina_preventiva";
  listEspe[113] = "urologia";
  listEspe[114] = "transplante_renal";
  listEspe[115] = "urologia_ginecologica";

  //argv[1] => Nombre del archivo

  int indi = atoi(argv[1]);
  printf("%s\n", listEspe[indi]);

    int indice;
    for(indice=0; indice<115; indice++){

    FILE *fp;
    fp = fopen(listEspe[indice], "r");
    

    FILE *fp2;
    char editedFileName[50];
    strcpy(editedFileName,listEspe[indice]);
    strcat(editedFileName, "Edited.csv");
    fp2 = fopen(editedFileName, "w+");

    if(!fp){
        printf("\nNo existe el archivo ingresado");
        exit(0);
    }
    printf("\nSe encontro el archivo: %s\n\n", listEspe[indice]);

    printf("Se creo el archivo: %s\n\n", editedFileName);

    char ch;
    const char comilla = '"';

    int flag = 0;

    fprintf(fp2,"%cMedico Especialista%c,%cEspecialidad%c,%cVigencia%c,%cNo. Certificado%c\n%c",comilla,comilla,comilla,comilla,comilla,comilla,comilla,comilla,comilla);
    while((ch=fgetc(fp)) != EOF){
        if(ch==','){
            flag++;
            fprintf(fp2,"%c",comilla);
            if(flag==4){
                fputs("\n",fp2);
                flag=0;
            }
            else{
                fprintf(fp2,"%c",ch);
            }
            fprintf(fp2,"%c",comilla);
        }
        else{
            fprintf(fp2,"%c",ch);
        }
    }

    fclose(fp);
    fclose(fp2);

    }
    

  return 0;
}

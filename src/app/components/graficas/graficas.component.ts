import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EstadisticaService } from 'src/app/service/estadistica.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styles: [
  ]
})
export class GraficasComponent implements OnInit {

  cargando: boolean = true;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], backgroundColor: 'RGB(180, 53, 250)', label: 'Veces seleccionada' },
      // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor: 'RGB(180, 53, 250)' },
    ]
  }

  public radarChartData: ChartData<'radar'> = {
    labels: [],
    datasets: [
      {
        // label: '',
        backgroundColor: 'rgba(249,115,22,0.11)',//
        borderColor: 'rgba(249,115,22,1)',//
        pointBackgroundColor: 'rgba(249, 115, 22, 1)',////** */
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(249, 115, 22, 1)',////** */
        data: []
      },
      {
        // label: '',
        backgroundColor: 'rgba(34, 197, 94, 0.11)',
        borderColor: 'rgba(34, 197, 94, 1)',
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(34, 197, 94, 1)',
        data: []
      },
      {
        // label: '14 a 17 años',
        backgroundColor: 'rgba(99, 102, 241, 0.11)',
        borderColor: 'rgba(99, 102, 241, 1)',
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
        data: []
      }
    ]
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  public barChartType: ChartType = 'bar';
  public radarChartType: ChartType = 'radar';


  @ViewChildren(BaseChartDirective) chart: QueryList<BaseChartDirective>
  

  constructor(public estadisticaService: EstadisticaService) { }

  ngOnInit(): void {

    this.datosGraficaBarras();
    this.datosGraficaRadar();
  }

  datosGraficaBarras() {

    this.estadisticaService.obtenerOpcionesMasSeleccionadas()
      .subscribe(({ labels, values }) => {

        this.cargando = false;

        this.barChartData.datasets[0].data = values;

        labels.forEach((rea, i) => {
          this.barChartData.labels.push(labels[i])
        });

        this.updateCharts();

      });

  }

  datosGraficaRadar() {
    this.estadisticaService.obtenerDatosGraficaRadar()
      .subscribe(respuesta => {

        console.log(respuesta);

        this.radarChartData.datasets[0].label = respuesta.grupos[0];
        this.radarChartData.datasets[1].label = respuesta.grupos[1];
        this.radarChartData.datasets[2].label = respuesta.grupos[2];

        this.radarChartData.labels = respuesta.opciones;
        this.radarChartData.datasets[0].data = respuesta.series_grupo1;
        this.radarChartData.datasets[1].data = respuesta.series_grupo2;
        this.radarChartData.datasets[2].data = respuesta.series_grupo3;
        this.updateCharts();
      })
  }

  updateCharts(){
    this.chart.forEach(test => {
      // console.log(test);
      test.chart.update();

    })
  }

}

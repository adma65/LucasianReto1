import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleComponent } from '../detalle/detalle.component';
import { Character } from '../model/Character';
import { GetDataService } from '../_service/get-data.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements AfterViewInit {
  displayedColumns: string[] = ['Nombre', 'Especie', 'Imagen', 'Estatus', 'Detail'];
  dataSource = new MatTableDataSource<Character>([]);
  pageSize = 0;
  length = 0;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.getCharacters();
    this.dataSource.paginator = this.paginator;
  }

  constructor(private getData: GetDataService, public dialog: MatDialog){}

  getCharacters(){
    this.getData.getCharacters().subscribe(response => {
      console.log(response);
      this.dataSource.data = response.results;
      setTimeout(() => {
        this.paginator.length = response.info["count"];
      });
    });
  }

  handlePage(e: PageEvent) {
    console.log(e);
    this.getData.getNewPage(e.pageIndex + 1).subscribe(response => {
      this.dataSource.data = response.results;
      setTimeout(() => {
        this.paginator.pageIndex = e.pageIndex;
        this.paginator.length = response.info["count"];
      });

    });
  }

  detail(element: Character){
    const dialogRef = this.dialog.open(DetalleComponent, {
      data: {element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The detail was closed');
    });
  }
}

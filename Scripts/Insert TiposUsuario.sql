SELECT TOP (1000) [ID]
      ,[TipoUsuario]
  FROM [VitalHub_G09M].[dbo].[TiposUsuario]

  USE [VitalHub_G09M]

  insert into TiposUsuario values
	(NEWID(),'Medico'),
	(NEWID(),'Paciente')